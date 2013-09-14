/**
 * Copyright [2012] [free-topo copyright npc]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * 		http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Topo UI 
 * @author zouxuejun, buhe
 */
if (typeof (FT) == "undefined")
	FT = {};


FT.TopoUI = function(topo){
	this.topo = topo;
	this.layout = topo.layout;
    this.style = {
    		"backgroundColor": '#0065BD'
    		// "width":500,
    		// "height":400
    };
    //TODO - set style by invoker
	this.nodeStyle = {
			"width" : 50,
			"height": 70,
			"image": "images/network.png",
			"font": '20px arial'
	};
	
	this.imageCache = {};
	//set value before first draw. 
	this.viewRect = null;
	var self = this;
	this.modelChangeHandler = function(e){
		if(e.name == 'nodeAdded'){
			self.layout.addNode(e.source);
		}else if(e.name == 'linkAdded'){
			// self.drawLink(e.source);
		}else if(e.name == 'nodeRemoved'){
			self.layout.removeNode(e.source);
		}else if(e.name == 'linkRemoved'){
			// self.clearLink(e.source);
		}
		//TODO - later 
		self.drawTopo();
	}
	
	if(typeof FT.TopoUI._initialized == "undefined"){
		
		FT.TopoUI.prototype.moveToViewRect = function(rect){
			this.viewRect = rect;
			// this.drawTopo();
		}
		
		FT.TopoUI.prototype.getViewRect = function(){
			return this.viewRect;
		}
		
		FT.TopoUI.prototype.drawTopo = function(){
			var w = this.topo.getGraphic().getWidth();
			var h = this.topo.getGraphic().getHeight();
			if(this.viewRect == null){
				this.viewRect = new GF.Rectangle(0,0,w,h);
			}
			this.topo.getGraphic().clearRect(new GF.Rectangle(0,0,w,h)); 
			this.__drawBackground();
			this.drawNodes();
			this.drawLinks();
		};
		
		FT.TopoUI.prototype.drawNodes = function(){
			for(var key in this.topo.getNodes()){
				var node = this.topo.getNodes()[key];
				var location = this.layout.getLocation(node);
				if(this.viewRect.contains(location)){ 
					//contains node
					this.drawNode(node);
				}
			}
		}
		
		FT.TopoUI.prototype.drawLinks = function(){
			for(var key in this.topo.getLinks()){
				var link = this.topo.getLinks()[key];
				var location1 = this.layout.getLocation(link.node1);
				var location2 = this.layout.getLocation(link.node2);
				if(this.viewRect.contains(location1) 
				&& this.viewRect.contains(location2)){  
					//contains start and end point.
					this.drawLink(link);
				}
			}
		}
		
		
		//private~~~
		FT.TopoUI.prototype.__drawBackground = function(){
			
	        var style =  '#0065BD';
	        var w = this.topo.getGraphic().getWidth();
			var h = this.topo.getGraphic().getHeight();
			this.topo.getGraphic().fillRect(new GF.Rectangle(0,0,w,h), style,'background');
		};
		
		FT.TopoUI.prototype.getNodeArea = function(node){
			var nodeWidth = this.nodeStyle["width"];
			var nodeHeight = this.nodeStyle["height"];

			var location = this.getViewportLocation(this.layout.getLocation(node));
			return new GF.Rectangle(location.x, location.y, nodeWidth, nodeHeight);
		};
		
		FT.TopoUI.prototype.getNodeCenterPoint = function(node){
			var rect = this.getNodeArea(node);
			return new GF.Point(rect.x + rect.width / 2, rect.y + rect.height /2);
		};
		
		FT.TopoUI.prototype.drawNode = function(node){
		
			var graphic = this.topo.getGraphic();
			
			var nodeRect = this.getNodeArea(node);
			
			var nodeWidth = nodeRect.width;
			var nodeHeight = nodeRect.height;
					
			var lineStyle = '#00FFFF';
			
			var lineWidth = this.topo.isNodeSelected(node)?3:1;
			graphic.drawRect(nodeRect, lineStyle, lineWidth); 
			
			
			var image = new Image();
			
			image.src = this.nodeStyle['image'];
			image.onload = function() {
				if(self.topo.containsNode(node.id)){ //deal image lazy load. 
					graphic.drawImage(image, nodeRect);
				}
			};
			
			
			var style = '#00FFFF';
			var text = node.getName();
			graphic.drawText(text, nodeRect, style);
			
		};
		
		FT.TopoUI.prototype.drawLink = function(link){
					
			var from = this.getNodeCenterPoint(link.node1);
			var to = this.getNodeCenterPoint(link.node2);
			//FIXME - deal -->layout-->viewRect
			var style = '#00FFFF';
			this.topo.getGraphic().drawLine(new GF.Line(from, to), style);
			

		};
		
		FT.TopoUI.prototype.getViewportLocation = function(point){
			return new GF.Point(point.x - this.viewRect.x,point.y - this.viewRect.y);
		}
		
		FT.TopoUI.prototype.clearNode = function(node){
		}
		FT.TopoUI.prototype.clearLink = function(link){
		}
		
		FT.TopoUI.prototype.createToolBar = function(viewPort,parentHtmlEm){
			
			var container=document.createElement("div");
			
			var zoomOut=document.createElement("button");
			zoomOut.innerText="zoomOut";
			zoomOut.onclick=function(){
				//TODO  call viewPort to show
			};
			
			
			var zoomIn=document.createElement("button");
			zoomIn.innerText="zoomIn";
			zoomIn.onclick=function(){
				//TODO  call viewPort to show
			};
			
			
			var moveLeft=document.createElement("button");
			moveLeft.innerText="Left";
			moveLeft.onclick=function(){
				//TODO  call viewPort to show
			};
			
			var moveRight=document.createElement("button");
			moveRight.innerText="Right";
			moveRight.onclick=function(){
				//TODO  call viewPort to show
			};
			
			container.appendChild(zoomOut);
			container.appendChild(zoomIn);
			container.appendChild(moveLeft);
			container.appendChild(moveRight);
			
			parentHtmlEm.appendChild(container);
		};
		
		FT.TopoUI._initialized = true;
	}
	
};
	
FT.Layout = function(){
	this.ui = {};
	this.nodeLocation = {};
}

FT.SimpleLayout = function(){
	FT.SimpleLayout.baseConstructor.call(this);
	if(typeof FT.SimpleLayout._initialized == "undefined"){
		FT.SimpleLayout.prototype.addNode = function(node){
			var id = node.id;
			vaildNode(id);
			if(typeof this.nodeLocation[id] == "undefined"){
				this.nodeLocation[id] = this.getRandomPosition();
			}
		}
		
		FT.SimpleLayout.prototype.removeNode = function(node){
			var id = node.id;
			if(typeof id == "undefined"){
				id = node;
			}
			vaildNode(id);
			delete this.nodeLocation[id];
		}
		
		FT.SimpleLayout.prototype.getLocation = function(node){
			var id = node.id;
			if(typeof id == "undefined"){
				id = node;
			}
			vaildNode(id);
			return this.nodeLocation[id];
		}
		
		FT.SimpleLayout.prototype.setLocation = function(nodeId, point){
			
			if(typeof point == "undefined") {
				throw new Error( 'point is undefined!');
			}
			vaildNode(nodeId);
			return this.nodeLocation[nodeId] = point;
		}
		

		function vaildNode(id) {
			if(typeof id == "undefined") {

				throw new Error( 'id is undefined!');
			}
		}

		FT.SimpleLayout.prototype.getRandomPosition = function() {
			//Random show in view rect.
			var x = Math.floor(this.ui.viewRect.width * Math.random());
			var y = Math.floor(this.ui.viewRect.height * Math.random());

			return new GF.Point(x, y);

		};
	}
}

FT.extend(FT.SimpleLayout,FT.Layout);


