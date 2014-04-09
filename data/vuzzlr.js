var Docco = require('docco'),
	marked = require('marked'),
	_ = require('underscore'),
	path = require('path');

var fs = require('fs');

var files = fs.readdirSync('./src');

var map = {"questions": []};

for(var i=0; i<files.length; i++){
	var file = files[i];
	var data = fs.readFileSync('./src/' + file);
	var mapItem = {};

	var config = { 
		languages: { 'js':null },
		extension: '.js',
		output: 'pages',
		template: 'template.jst'
	};

	dir = path.join(__dirname, 'resources');
	var template = path.join(dir, 'template.jst');
	template = _.template(fs.readFileSync(template).toString());

	var sections = Docco.parse(null, data.toString(), config);
	var keys = {}, text = '', words = [], heap = [];
	sections.forEach(function(section){
		//console.log(section);
		var words = section.docsText.match(/[a-zA-Z]+/g);
		if(!words) return;
		words.forEach(function(word){
			if(word.length <= 2 || (["the", "then", "that", "which"].indexOf(word) != -1)) return;
			word = word.toLowerCase();
			if(keys.hasOwnProperty(word))
				keys[word]++;
			else
				keys[word] = 1;

			var heapid = heap.indexOf(word);
			if(heapid == -1){

				if(heap.length < 4){
					heapid = 0;
					while(heap.length > 0 && keys[word] > heap[heapid]) heapid++;
					heap.splice(heapid, 0, word);					
				}
				else if (keys[word] > heap[0]){
					heap.splice(0,1);
					heapid = 0;
					while(heap.length > 0 && keys[word] > heap[heapid]) heapid++;
					heap.splice(heapid, 0, word);	
				}

			}
			else{
				heap.splice(heapid, 1);
				while(keys[word] > heap[heapid]) heapid++;
				heap.splice(heapid, 0, word);
			}
			console.log(word, heap);

		});
	});
	mapItem.k = heap;


	Docco.format('./src/' + file, sections, config);

    destination = function(file) {
      return path.join(config.output, path.basename(file, path.extname(file)) + '.html');
    };

    var first = marked.lexer(sections[0].docsText)[0];
    var hasTitle = first && first.type === 'heading' && first.depth === 1;
    var title = hasTitle ? first.text : path.basename(source);
    mapItem.t = title;
    mapItem.p = (destination(file));
    map["questions"].push(mapItem);

    var html = template({
      title: title,
      hasTitle: hasTitle,
      sections: sections,
      path: path,
      destination: destination
    }); 

    console.log("Building: " + file + " -> " + (destination(file)));
    fs.writeFileSync(destination(file), html);
}
console.log(map);
map["questions"].sort();
fs.writeFileSync('map.json', JSON.stringify(map));