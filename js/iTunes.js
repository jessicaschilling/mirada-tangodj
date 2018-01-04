var _ = require("underscore")._,
	applescript = require("applescript");


var iTunes = {

	player:   {
		state:    "player state as string",

		position: {
			get:  "player position as integer",
			set:  "set player position to ?"
		}
	},

	track:    {
		id:       "persistent ID of current track as string",
		title:    "name of current track as string",
		artist:   "artist of current track as string",
		album:    "album of current track as string",
		finish:   "finish of current track as integer",

		rating:   {
			get:      "rating of current track as integer",
			set:      "set rating of current track to ?"
		},

		artwork:  {
			rawdata:  "raw data of artwork 1 of current track",
			format:   "format of artwork 1 of current track as string"
		}
	},

	play:     "play",
	playpause:"playpause",
	pause:    "pause",
	stop:     "stop",
	next:     "next track",
	prev:     "previous track",

	shuffle:  {
		get:  "shuffle of current playlist",
		set:  "set shuffle of current playlist to ?"
	},

	mute: {
		get:  "mute as boolean",
		set:  "set mute to ?"
	},

	volume: {
		get:  "sound volume as integer",
		set:  "set sound volume to ?"
	},

	quit:     "quit"

};


_.each(iTunes, CommandFunction);


module.exports = iTunes;


function CommandFunction(val, key, obj) {
	var tell = "tell application \"iTunes\" to ";

	obj[key] = function (arg, fn) {
		var cmd = tell,
			hasArg = !_.isFunction(arg);

		if (isObject(val)) {
			cmd += hasArg ? val.set : val.get;
		} else {
			cmd += val;
		}

		if (!hasArg) {
			// if the first arg is a function, use `arg` as the callback `fn`
			fn = arg;
		} else if (/\?/.test(cmd)) {
			// if an argument was passed in, and the cmd contains a '?'
			cmd = cmd.replace(/\?/, arg);
		}

		// execute the applescript command
		applescript.execString(cmd, function (err, ret) {
			// if an error has occurred
			err && console.error(err);

			//invert the order of the arguments
			fn && fn(ret, err);
		});
	};

	if (isObject(val)) {
		//var keys = _.keys(val).sort().join(",");

		var cpy = _.clone(val);

		cpy.get && delete "get";
		cpy.set && delete "set";

		_.each(cpy, CommandFunction);

		_.extend(obj[key], cpy);
	}

}


function isObject(obj) {
	return Object.prototype.toString.call({}) === Object.prototype.toString.call(obj);
}
