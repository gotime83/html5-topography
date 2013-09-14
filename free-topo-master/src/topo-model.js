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
 * Topo Model 
 * @author zouxuejun, buhe
 */
if( typeof (FT) == "undefined")
	FT = {};

FT.Model = function(config) {
	FT.Model.baseConstructor.call(this);
	this.id = config.id;
	this.type = config.type;
};

FT.extend(FT.Model, FT.Observable);

FT.Network = function(config) {
	FT.Network.baseConstructor.call(this, config);
	this.type = 'network';
	this.nodes = __initEle(config.nodes);
	this.links = __initEle(config.links);
	if( typeof FT.Network._initialized == "undefined") {
		FT.Network.prototype.addNode = function(node) {
			this.nodes[node.id] = node;
			this.fireEvent('nodeChanged', {
				name : 'nodeAdded',
				source : node
			});
		}
		FT.Network.prototype.addLink = function(link) {
			this.links[link.id] = link;
			this.fireEvent('linkChanged', {
				name : 'linkAdded',
				source : link
			});
		}
		FT.Network.prototype.removeNode = function(nodeId){
			node = this.nodes[nodeId];
			delete this.nodes[nodeId];
			this.fireEvent('nodeChanged', {
				name : 'nodeRemoved',
				source : node
			});
			return node;
		}
		FT.Network.prototype.removeLink = function(linkId){
			link = this.links[linkId];
			delete this.links[linkId];
			this.fireEvent('linkChanged', {
				name : 'linkRemoved',
				source : link
			});
			return link;
		};
		
		FT.Network.prototype.updateNode = function(node){
			var nodeId = node.id;
			if(this.containsNode(nodeId)){
				this.nodes[nodeId] = node;
				this.fireEvent('nodeChanged', {
					name : 'nodeChanged',
					source : node
				});
			}
			
		};
		
		FT.Network.prototype.containsNode = function(nodeId){
			return (typeof this.nodes[nodeId] ) != "undefined" 
			&& this.nodes[nodeId] != null;
		}
		
		FT.Network.prototype.containsLink = function(linkId){
			return (typeof this.links[linkId] ) != "undefined" 
			&& this.links[linkId] != null;
		}
		
		FT.Network.prototype.getNodes = function(){
			return this.nodes;
		}
		
		FT.Network.prototype.getLinks = function(){
			return this.links;
		}

		FT.Network._initialized = true;
	}
	//private
	function __initEle(eles) {
		var eleMap = {};
		if(eles) {
			for(var i in eles) {
				eleMap[eles[i].id] = eles[i];
			}
		}
		return eleMap;
	}

};

FT.extend(FT.Network, FT.Model);

FT.Element = function(config) {
	this.id = config.id;
	if( typeof FT.Element._initialized == "undefined") {
		FT.Node.prototype.getId = function() {
			return this.id;
		}
		FT.Element._initialized = true;
	}
};

FT.Node = function(config) {
	//call parent constructor
	FT.Node.baseConstructor.call(this, config);

	this.label = config.label;
	this.x = config.x;
	this.y = config.y;

	if( typeof FT.Node._initialized == "undefined") {

		FT.Node.prototype.setName = function(name) {
			this.name = name;
		};

		FT.Node.prototype.getName = function() {
			return this.name;
		};

		FT.Node.prototype.getLocation = function() {
			return new GF.Point(this.x, this.y);
		};

		FT.Node.prototype.setLocation = function(point) {
			this.x = point.x;
			this.y = point.y;
		};

		FT.Node._initialized = true;
	}
};

FT.extend(FT.Node, FT.Element);

FT.Relation = function(config) {
	FT.Relation.baseConstructor.call(this, config);
	this.type = config.type;
	this.node1 = config.node1;
	this.node2 = config.node2;
};
FT.extend(FT.Relation, FT.Element);

FT.Link = function(config) {
	FT.Link.baseConstructor.call(this, config);
	this.type = 'link';
	this.direction = config.direction;
};
FT.extend(FT.Link, FT.Relation);
