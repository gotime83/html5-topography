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
 * @author buhe
 */
if (typeof (Topo) == "undefined")
	Topo = {};

Topo.network = function(config) {

	this.id 				= config.id;
	
	this.menufactory		= config.menufactory;	//生成上下文菜单
	this.tipfactory			= config.tipfactory;	//生成上下问ToolTip
	this.backgroud			= config.backgroud;
	this.canvas 			= document.getElementById(this.id);
	this.context 			= this.canvas.getContext ? this.canvas.getContext("2d") : null;
	this.canvas.__object__ 	= this;
	this.type 				= 'network';
	this.nodes 				= this.__initNodes(config.nodes);
	this.links 				= this.__initLinks(config.links);
	this.__scale 			= 1.0;
	this.__paintSelf();
};
Topo.network.prototype.paint = function() {
	this.__paintBG();
	if (this.nodes) {
		for ( var id in this.nodes) {
			this.nodes[id].paint();
		}
	}
	if (this.links) {
		for ( var id in this.links) {
			this.links[id].paint();
		}
	}
};
/**
 * 缩放
 * @param scale
 */
Topo.network.prototype.zoom = function(scale){
	this.__clearAll();
	this.__scale *= scale;
	this.context.scale(scale,scale);
	this.paint();
};
/**
 * 恢复原有大小
 */
Topo.network.prototype.zoomReset = function(){
	this.__clearAll();
	this.context.scale(1.0 / this.__scale,1.0 / this.__scale);
	this.__scale = 1.0;
	this.paint();
};

Topo.network.prototype.addElement = function(ele) {
	if (!ele)
		return;

	if (ele.type == "node") {
		this.__addNode(ele);
	} else if (ele.type == "link") {
		this.__addLink(ele);
	}

};

Topo.network.prototype.getElement = function(id) {
	if (id) {
		ele = this.nodes[id];
		if (!ele)
			ele = this.links[id];
	}
	return ele;

};

Topo.network.prototype.getElementByPoint = function(p) {
	if (this.nodes) {
		for ( var i in this.nodes) {
			if(this.nodes[i].inNode(p.x,p.y)){
				return this.nodes[i];
			}
		}
	}
};

Topo.network.prototype.getMouseXY = function(e) {
	//offsetX for chrome , FF not support
	
	return {
		x : e.offsetX / this.__scale,
		y : e.offsetY / this.__scale
	};
};

// private
Topo.network.prototype.__addNode = function(node) {
	node["ctx"] = this.context;
	this.nodes[node.id] = new Topo.node(node);
	this.nodes[node.id].paint();
};
// private
Topo.network.prototype.__addLink = function(link) {
	link["ctx"] = this.context;
	this.links[link.id] = new Topo.link(link);
	this.links[link.id]["from"] = this.getElement(this.links[link.id].from);
	this.links[link.id]["to"] = this.getElement(this.links[link.id].to);
	this.links[link.id].paint();
};

Topo.network.prototype.__paintSelf = function() {
	Topo.component.createToolbar(this);
	Topo.component.initDD(this);
	Topo.component.initMenu(this);
	Topo.component.initToolTip(this);
};

Topo.network.prototype.__paintBG = function() {
	if(this.backgroud && Topo.component.lookupImage(this.backgroud)){
		var bgImage = Topo.component.lookupImage(this.backgroud);
		this.context.drawImage(bgImage,0,0,bgImage.width,bgImage.height,0 , 0, this.canvas.width , this.canvas.height);
	}
}

Topo.network.prototype.__initNodes = function(nodes) {
	var nodeMap = {};
	if (nodes) {
		for ( var i in nodes) {
			nodeMap[nodes[i].id] = new Topo.node({  //TODO - 这里参数调整不方便
				id : nodes[i].id,
				x : nodes[i].x,
				y : nodes[i].y,
				w : nodes[i].w,
				h : nodes[i].h,
				image : nodes[i].image,
				ctx : this.context
			});
		}
	}
	return nodeMap;
};

Topo.network.prototype.__initLinks = function(links) {
	var linkMap = {};
	if (links) {
		for ( var i in links) {
			var id = links[i].id;
			var from = this.getElement(links[i].from);
			var to = this.getElement(links[i].to);
			linkMap[id] = new Topo.link({
				id : id,
				from : from,
				to : to,
				ctx : this.context
			});
		}
	}
	return linkMap;
};

Topo.network.prototype.__clearAll = function(){
	this.context.clearRect(0 , 0, this.canvas.width , this.canvas.height);
};