const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const axios = require('axios')
const uuid = require('uuid')
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json()) 
app.use(cookieParser())
app.use(cors())

let client_id = process.env.CLIENT_ID
let client_secret = process.env.CLIENT_SECRET

let redirect_uri = 'http://localhost:5000/callback'
let frontend_uri = 'http://localhost:3000'
let statekey = 'spotify_auth_state'

let tokensForAuth ={}

const generateRandomString = function (length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

app.get('/login', function(req, res) {

	let scopes = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-read-currently-playing user-library-read playlist-read-private playlist-read-collaborative';

	const state = generateRandomString(16);

	res.cookie(statekey,state)


	res.status(301).redirect('https://accounts.spotify.com/authorize' +
		'?response_type=code' + '&client_id=' + client_id +
		(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		'&redirect_uri=' + encodeURIComponent(redirect_uri) + 
		'&state='+state);
});


app.get('/callback', async function(req,res){
	try{
		let recievedState = req.query.state || null
		let receivedCode = req.query.code || null
		let statecookie = req.cookies?req.cookies[statekey]:null

		if(recievedState === null || recievedState !== statecookie) {
			console.log("invalid state")
			return res.redirect('http://localhost:3000?token=invalid')
		}
		else{
			const params = new URLSearchParams();
			params.append('code', receivedCode);
			params.append('redirect_uri', redirect_uri);
			params.append('grant_type',  'authorization_code');

			const {data}  = await axios({
				method:'POST',
				url:'https://accounts.spotify.com/api/token',
				params,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
						'base64',
						)}`,
				},
				json:true
			})
			data.recivedAt = Date.now()
			let tempTokenId = uuid.v4()
			tokensForAuth[tempTokenId]=data
			
			return res.redirect(`http://localhost:3000?token=${tempTokenId}`)
		}
	}
	catch(e)
	{
		return console.log(e)
	}


});


app.put('/getAuthToken', function(req,res){
	let tempTokenId = req.query.token || null
	console.log("incoming request", tempTokenId)
	const tokenAuth = tokensForAuth[tempTokenId]
	delete tokensForAuth[tempTokenId]
	if(tempTokenId){
		return res.status(200).json(tokenAuth)
	}
	return res.status(401).json({error:"Code not found"})
})


app.get('/getRefreshedAccessToken', async function(req,res){
	try{
	let refreshToken = req.query.refreshToken || null

	if(!refreshToken){
		return res.status(403).json({error:"Code not found"})
	}
	

	const params = new URLSearchParams();
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', refreshToken);


	const {data}  = await axios({
		method:'POST',
		url:'https://accounts.spotify.com/api/token',
		params,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
				'base64',
				)}`,
		},
		json:true
	})
	
	return res.json(data)
}
catch(e){
	console.log(e)
	return res.status(500).json({message:"Internal server error"})
}

})

app.listen(5000, () => {
	console.log("server is running on port 5000")
})