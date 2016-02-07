function Mapper(parameters){
	var params={
		size:25,
		type:'flat'
	};

	function init(){
		for(var param in parameters){
			params[param]=parameters[param];
		}

		if(params.type==='flat'){
			params.height=Math.sqrt(params.size*params.size-(params.size/2)*(params.size/2));
			params.width=params.size;
			params.baseHex=[
				{x:0, y:params.height},
				{x:(params.width/2), y:0},
				{x:(params.width/2)+params.width, y:0},
				{x:params.width*2, y:params.height},
				{x:(params.width/2)+params.width, y:params.height*2},
				{x:(params.width/2), y:params.height*2}
			];

		}else if(params.type=='point'){

		}
	};
	
	this.getFieldHexPoints=function(hex){
		if(params.type==='flat'){
			var diff={x:-params.width/2,y:0};
			if(hex.pos.x%2===1){
				diff.y=params.height;
			}
			return params.baseHex.map(function(item){
				return {
					x:item.x+(params.width*2+diff.x)*hex.pos.x,
					y:item.y+hex.pos.y*params.height*2+diff.y
				};

			});
		}
	};

	this.calcMapPoints=function(map){
		var that=this;
		var mapSize={x:0, y:0};
		if(params.type==='flat'){
			map.forEach(function(item){
				item.points=that.getFieldHexPoints(item);
				if(mapSize.x<item.pos.x) mapSize.x=item.pos.x;
				if(mapSize.y<item.pos.y) mapSize.y=item.pos.y;
			});

			map.height=(mapSize.y+1)*2*params.height;
			if(mapSize.x>0) map.height+=params.height;
			map.width=(mapSize.x+1)*(params.width+params.width/2)+params.width/2;
		}

	};

	init();
}