

function Topo(canvasName){
	
	
	this.version = "1.0";
	
	this.canvasName = canvasName;
	this.canvas = document.getElementById(canvasName);
	
	this.dragableNode = null;
	
	this.nodeDragableHandler = function (event){
		
			var point = new Point(event.offsetX, event.offsetY);
			var node = topo.getNodeAtPoint(point);
			if(node==null){
				return;
			}
			
			topo.dragableNode = node;
		
	};
	
	this.nodeRestoreHandler = function (event){
		
		topo.dragableNode = null;
	
	};
	
	this.nodeMoveHandler = function (event){
		
		if(topo.dragableNode==null){
			return;
		}
		var point = new Point(event.offsetX, event.offsetY);
		topo.dragableNode.setLocation(point);
		topo.paint();
	
	};
	this.canvas.addEventListener('mousemove', this.nodeMoveHandler, false);
	this.canvas.addEventListener('mousedown', this.nodeDragableHandler, false);
	this.canvas.addEventListener('mouseup', this.nodeRestoreHandler, false);
	
	this.nodes = new Array();
	this.links = new Array();
	
	this.topoUI = new TopoUI();
	
	if(typeof Topo._initialized == "undefined"){
		
			
		Topo.prototype.getNodes = function(){
			return this.nodes;
		};
		
		Topo.prototype.setNodes = function(nodes){
			this.nodes = nodes;
		};
		
		Topo.prototype.getLinks = function(){
			return this.links;
		};
		
		Topo.prototype.setLinks = function(links){
			this.links = links;
		};
		
		Topo.prototype.getNodeAtPoint = function(point){
			for(var index in this.nodes){
				var node = this.nodes[index];
				var rect = this.getUI().getNodeSize();
				if(point.x >= node.x && point.x <= node.x + rect.width
				  && point.y >=node.y && point.y <= node.y + rect.height){
					return node;
				}
			}
			return null;
		};
		
		Topo.prototype.setBackground = function(url){
			this.background = url;
		};
		
		Topo.prototype.addNodes = function(nodes){
			for(var index in nodes){
				this.nodes[this.nodes.length] = nodes[index];
				
			}
		}
		
		Topo.prototype.addLinks = function(links){
			for(var index in links){
				this.links[this.links.length] = links[index];
			}
		}
		
		Topo.prototype.getContext = function(){
			return this.canvas.getContext();
		}
		
		Topo.prototype.getWidth = function (){
			return this.canvas.width;
		};
		
		Topo.prototype.getHeight = function(){
			return this.canvas.height;
		};
		
		Topo.prototype.getUI = function(){
			return this.topoUI;
		};
		
		Topo.prototype.setUI = function(topoUI){
			this.topoUI = topoUI;
		};
		
		Topo.prototype.paint = function(){
			this.getUI().drawTopo(topo);
		};
		
		Topo.prototype._initialized = true;
	}
	
}

function Node(){
	
	this.name = "node1234567890";
	this.x = 0;
	this.y = 0;
	
	this.attrs = null;
	
	if(typeof Node._initialized == "undefined"){
		
		Node.prototype.setName = function(name){
			this.name = name;
		};
		
		Node.prototype.getName = function(){
			return this.name;
		};
		
		Node.prototype.getLocation = function(){
			return new Point(this.x, this.y);
		};
		
		Node.prototype.setLocation = function(point) {
			this.x = point.x;
			this.y = point.y;
		};
		
		
		Node._initialized = true;
	}
}


function Link(fromNode, toNode){
	this.from = fromNode;
	this.to = toNode;
	
	this.direction = null;
}
