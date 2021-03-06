const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const axios = require('axios')
const uuid = require('uuid')
const history = require('connect-history-api-fallback')
const expressStaticGzip = require("express-static-gzip");
dotenv.config()
const compression = require('compression');

app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json()) 
app.use(cookieParser())
app.use(cors())

app.use('/', expressStaticGzip('client/build',{
	enableBrotli: true,
    customCompressions: [{
        encodingName: 'gzip',
        fileExtension: 'gz'
    }],
}));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(compression());

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/callback'
const frontend_uri = process.env.FRONTEND_URI || 'http://localhost:3000'
const PORT = process.env.PORT || 5000;
const statekey = 'spotify_auth_state'



let tokensForAuth ={}

const generateRandomString = function (length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};


app.get('/loginserver', function(req, res) {

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
			return res.redirect(`${frontend_uri}?token=invalid`)
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

			return res.redirect(`${frontend_uri}?token=${tempTokenId}`)
		}
	}
	catch(e)
	{
		return console.log(e)
	}


});


app.put('/getAuthToken', function(req,res){
	let tempTokenId = req.query.token || null

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


app.get('/*', function (req, res) {
	res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});


app.listen(PORT, () => {
	console.log("server is running on port 5000")
})