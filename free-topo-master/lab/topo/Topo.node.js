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
if(typeof(Topo) == "undefined") Topo= {};

Topo.node = function(config){
	this.id 	= config.id;
	this.w 		= config.w;
	this.h 		= config.h;
	this.x 		= config.x;
	this.y 		= config.y;
	//private
	this.type 	= "node";
	this.cx		= this.x + this.w / 2;
	this.cy		= this.y + this.h / 2;
	this.ctx	= config.ctx;
	this.image	= config.image;
	this.uiKey	= "node.ui";
	this.ui		= Topo.uiMgr.getUI(this.uiKey);
	eval("this.ui = new " + this.ui + "(this);");
};

Topo.node.prototype.paint = function(){
	this.ui.paint();
};

Topo.node.prototype.setXYWH = function(x,y,w,h){
	this.w 		= w;
	this.h 		= h;
	this.x 		= x;
	this.y 		= y;
	this.cx		= this.x + this.w / 2;
	this.cy		= this.y + this.h / 2;
}

Topo.node.prototype.inNode = function(x,y){
	return (x > this.x && x < this.x + this.w) && (y > this.y && y < this.y + this.w );
};