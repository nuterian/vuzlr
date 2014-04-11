/**
* @jsx React.DOM
*/

(function(){

	Number.prototype.mod = function (n) {
	    return ((this % n) + n) % n;
	}

	var getFile = function(fileName, callback){
		var req = new XMLHttpRequest();
		req.onload = callback;
		req.open("GET", fileName, true);
		req.send();
	}
	
	function debounce(eventHandler, delay) {

	  	var timer;

		var anotherFunction = function(){

			var ctx = this, args = arguments;
		  	clearTimeout(timer);
		 
			timer = setTimeout(function(){
				timer = null;
				eventHandler.apply(ctx, args);
			}, delay);
		}
	  
	  	return anotherFunction;
	}

	var QueryProcessor = function(){

		var map = {},
			keymap = {},
			keys = [];

		function generateKeyMap(){
			// Function to generate a map of keys to question indices
			// within the original map
			var qq = map["questions"];
			for(var i =0; i<qq.length; i++){
				var q = qq[i], qk = q["k"];
				for(var j=0; j<qk.length; j++){
					if(keymap.hasOwnProperty(qk[j]))
						keymap[qk[j]].push(i);
					else
						keymap[qk[j]] = [i];
				}
				delete q["k"];
			}
			keys = Object.keys(keymap).sort();
		}

		getFile("/data/map.json", function(e){
			map = JSON.parse(e.target.responseText);
		});

		return  {
			query: function(q){
				q = q.toLowerCase();

				var matches = { 'h': [], 'm': [], 'l': []};
				var questions = map["questions"];

				for(var i = 0; i <questions.length; i++){
					var question = questions[i];
					if(question.t.toLowerCase().indexOf(q) >= 0){
						matches["h"].push(question);
					}
					else if(q.length > 1 && question.k.join(" ").indexOf(q) >= 0){
						matches["m"].push(question);
					}
				}

				var res = [].concat(matches["h"]).concat(matches["m"]).concat(matches["l"]);
				return res.splice(0, 10);
			}
		}
	}
	var QP = new QueryProcessor();


	var MatchItem = React.createClass({
		render: function(){
			return (
				<div className={"match-item " + (this.props.selected ? 'selected' : '' )}>
					<h4 className="match-title">{this.props.title}</h4>
					<div className="match-keywords">{[].join.call(this.props.keywords,", ")}</div>
				</div>
			);
		}
	});

	var MatchList = React.createClass({
		render: function(){
			var _this = this;
			var matchNodes = this.props.data.map(function(match){
				return <MatchItem title={match.t} keywords={match.k} page={match.p} selected={match.selected} />;
			});
			return (
				<div className="match-list">
					{matchNodes}
				</div>
			);
		}
	});

	var SearchBar = React.createClass({

		matches: [],
		curMatch: -1,

		getInitialState: function(){
			this.debouncedTextInput = debounce(this.handleTextInput, 500);
			return {data: []};
		},

		handleKeyDown: function(e){
			if(e.keyCode == 38 || e.keyCode == 40){
				// Up or Down Arrow Keys

				if(this.curMatch >= 0) this.matches[this.curMatch].selected = 0;
				if(e.keyCode == 38)
					this.curMatch = (this.curMatch - 1).mod(this.matches.length);
				else
					this.curMatch = (this.curMatch + 1).mod(this.matches.length);

				this.matches[this.curMatch].selected = true;
				this.setState({data: this.matches});

			}
		},

		handleTextInput: function(){
			if(this.curMatch >= 0) this.matches[this.curMatch].selected = false;
			this.curMatch = -1;

			var q = this.refs.query.getDOMNode().value.trim();
			if(!q) this.matches = [];
			else this.matches = QP.query(q);
			this.setState({data: this.matches});
		},

		handleKeyUp: function(e){

			if(e.keyCode == 38 || e.keyCode == 40){}
			else if(e.keyCode == 13 || e.keyCode == 27){
				if(e.keyCode == 13) this.props.onSelect(this.matches[this.curMatch].p);
				this.refs.query.getDOMNode().value = '';
				this.setState({data: []});
			}
			else{
				this.debouncedTextInput();
			}

			return false;
		},

		handleMatchSelect: function(page){
			this.props.onSelect(page);
		},

		render: function(){
			return (
				//<form className="searchForm"  >
				<div className="search-form">
					<input className="search-input" type="text" placeholder="Enter keywords..." onKeyUp={this.handleKeyUp} onKeyDown={this.handleKeyDown} ref="query" />
					<MatchList data={this.state.data} />
				</div>
				//</form>			
			);
		}
	});
	
	//var markdowner = new Showdown.converter();
	var ArticleBox = React.createClass({
		render: function(){
			var rawMarkup = this.props.data;
			return (
				<div className="article-box"> <span dangerouslySetInnerHTML={{__html: rawMarkup}} /></div>
			);
		}
	});

	var VuzzleApp = React.createClass({
		getInitialState: function(){
			return {
				data: ""
			}
		},
		handleMatchSelect: function(page){
			var that = this;
			getFile('/data/'+page, function(e){
				that.setState({data: e.target.responseText})
			});
		},
		render: function(){
			return (
				<div>
					<SearchBar onSelect={this.handleMatchSelect}/>
					<ArticleBox data = { this.state.data } />
				</div>
			);
		}
	});


	window.onload = function(){
		React.renderComponent(
			<VuzzleApp />,
			document.getElementById("searchBox")
		);
	}

})();