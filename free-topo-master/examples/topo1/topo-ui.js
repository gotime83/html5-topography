
function TopoUI(){
	
    this.style = {
    		"backgroundColor": '#0065BD'
    };
    
	this.nodeStyle = {
			"width" : 50,
			"height": 70,
			"image": "images/network.png",
			"font": '20px arial'
	};
	
	this.imageCache = {};
	
	if(typeof TopoUI._initialized == "undefined"){
		
		TopoUI.prototype.getContext = function(topo){
			return topo.canvas.getContext("2d");
		};
		
		TopoUI.prototype.drawTopo = function(topo){
			//TODO draw topo here
			this.drawBackground(topo);
			
			for(var index in topo.getNodes()){
				this.drawNode(topo, topo.getNodes()[index]);
			}
			
			for(var index in topo.getLinks()){
				this.drawLink(topo, topo.getLinks()[index]);
			}
		};
		
		
		TopoUI.prototype.drawBackground = function(topo){
			
			var ctx = this.getContext(topo);
			
			ctx.fillStyle = '#0065BD';
	        ctx.fillRect(0, 0, topo.canvas.width, topo.canvas.height);

		  			 
		};
		
		TopoUI.prototype.getNodeSize = function(node){
			
			var nodeWidth = this.nodeStyle["width"];
			var nodeHeight = this.nodeStyle["height"];
			return new Rectangle(nodeWidth, nodeHeight);
		};
		
		TopoUI.prototype.getNodeCenterPoint = function(node){
			var rect = this.getNodeSize(node);
			return new Point(node.x + rect.width / 2, node.y + rect.height /2);
		};
		
		TopoUI.prototype.drawNode = function(topo, node){
			//TODO draw node here
			var ctx = this.getContext(topo);
			
			var location = node.getLocation();
			
			var nodeRect = this.getNodeSize();
			
			var nodeWidth = nodeRect.width;
			var nodeHeight = nodeRect.height;
					
			ctx.strokeStyle = '#00FFFF';
			
			ctx.strokeRect(location.x, location.y, nodeWidth, nodeHeight); 
			
			var image = new Image();
			
			image.src = this.nodeStyle['image'];
			image.onload = function() {
				ctx.drawImage(image, location.x, location.y, nodeWidth, nodeHeight - 15);
			};
			
			ctx.fillStyle = '#00FFFF';
			ctx.textAlign = 'center';
				
			var text = node.getName();
			
			var metric = ctx.measureText(text);
			var textWidth = metric.width;
			
			
			ctx.fillText(node.getName(), location.x + (nodeWidth/2), location.y + nodeHeight - 7.5, nodeWidth);
		};
		
		TopoUI.prototype.drawLink = function(topo, link){
			//TODO draw link here;
			var ctx = this.getContext(topo);
			
			var from = this.getNodeCenterPoint(link.from);
			var to = this.getNodeCenterPoint(link.to);
			
			ctx.strokeStyle = '#00FFFF';
			ctx.beginPath();
			ctx.moveTo(from.x, from.y);
			ctx.lineTo(to.x, to.y);

			ctx.closePath();
			ctx.stroke();

		};
		
		TopoUI.prototype.convertToPoint = function(point){
			return point;
		};
		
		TopoUI.prototype.getRandomPosition = function (topo){
			
			var x = Math.floor(topo.getWidth() * Math.random());
			var y = Math.floor(topo.getHeight() * Math.random());
			
			return new Point(x, y);

		};
		TopoUI._initialized = true;
	}
}

