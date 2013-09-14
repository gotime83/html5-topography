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

Topo.link = function(config){
	this.id 	= config.id;
	this.from	= config.from;
	this.to		= config.to;
	this.ctx	= config.ctx;
	this.uiKey	= "link.ui";
	this.ui		= Topo.uiMgr.getUI(this.uiKey);
	eval("this.ui = new " + this.ui + "(this);");
};

Topo.link.prototype.paint = function(){
	this.ui.paint();
};