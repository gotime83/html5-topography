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
 * Topo Component
 * @author zouxuejun, buhe
 */
if( typeof (FT) == "undefined")
	FT = {};

FT.Topo = function(config) {

	FT.Topo.baseConstructor.call(this, config);
	this.version = "1.0";

	this.parentEmId = config.parentEmId;
	this.model = config.model;

	this.parent = null;

	this.currentPath = null;
	// parent class
	// this.width = config.width;
	// this.height = config.height;
	this.layout = config.layout;
	if( typeof this.layout == "undefined") {
		//default use SompleLayout
		this.layout = new FT.SimpleLayout();
	}
	this.topoUI = new FT.TopoUI(this);
	this.layout.ui = this.topoUI;
	//UI observe model changed

	this.model.on('nodeChanged', 'linkChanged', this.topoUI.modelChangeHandler);

	this.grahpic = null;

	
	this.dragNow = false;
	this.dragObj = null;
	this.dragPoint = null;
	
	this.selectedNode = null;
	
	this.on('mousedown', function(event){
		var node = this.getNodeAtPoint(new GF.Point(event.offsetX, event.offsetY));
		if(node!=null){
			this.dragNow = true;
			this.dragObj = node;
			
			var loc = this.layout.getLocation(node);
			this.dragPoint = new GF.Point(event.offsetX - loc.x, event.offsetY - loc.y);
			
			//选中节点
			this.selectedNode = node;
		}	
	});
	
	this.on('mouseup', function(event){
		
		this.dragNow = false;
		this.dragObj = null;
		this.dragPoint = null;
		
		this.selectedNode = null;
			
	});
		
	this.on('mousemove', function(event){
		var node = this.dragObj;
		if(node!=null && this.dragNow){
			
			
			var location = 
					new GF.Point(event.offsetX - this.dragPoint.x, event.offsetY - this.dragPoint.y);
			//TODO compute location here
			this.layout.setLocation(node.id, location);
			this.model.updateNode(node);

		}

	});
	if( typeof FT.Topo._initialized == "undefined") {

		FT.Topo.prototype.getNodeAtPoint = function(point) {
			for(var index in this.getNodes()) {
				var node = this.getNodes()[index];
				var rect = this.getUI().getNodeArea(node);
				if(point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height) {
					return node;
				}
			}
			return null;
		};

		FT.Topo.prototype.setBackground = function(url) {
			this.background = url;
		};

		FT.Topo.prototype.addNode = function(node) {
			this.model.addNode(node);
		};

		FT.Topo.prototype.addLink = function(link) {
			this.model.addLink(links);
		};

		FT.Topo.prototype.getNodes = function() {
			return this.model.getNodes();
		};

		FT.Topo.prototype.getLinks = function() {
			return this.model.getLinks();
		};

		FT.Topo.prototype.removeNode = function(nodeId) {
			return this.model.removeNode(nodeId);
		};

		FT.Topo.prototype.removeLink = function(linkId) {
			return this.model.removeLink(linkId);
		};

		FT.Topo.prototype.containsNode = function(nodeId) {
			return this.model.containsNode(nodeId);
		};

		FT.Topo.prototype.containsLink = function(linkId) {
			return this.model.containsLink(linkId);
		};

		FT.Topo.prototype.getWidth = function() {
			return this.width;
		};

		FT.Topo.prototype.getHeight = function() {
			return this.height;
		};

		FT.Topo.prototype.getUI = function() {
			return this.topoUI;
		};

		FT.Topo.prototype.setUI = function(topoUI) {
			this.topoUI = topoUI;
		};

		FT.Topo.prototype.paint = function() {
			this.getUI().drawTopo();
		};

		FT.Topo.prototype.moveToViewRect = function(viewRect) {
			this.getUI().moveToViewRect(viewRect);
		};

		FT.Topo.prototype.getViewRect = function() {
			return this.getUI().getViewRect();
		};
		
		FT.Topo.prototype.isNodeSelected = function(node){
			return this.selectedNode==node;
		};

		FT.Topo.prototype._initialized = true;
	}
};
FT.extend(FT.Topo, FT.Component);

