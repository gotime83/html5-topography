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
 * 用Canvas实现的默认UI
 * @author bugu
 */
Topo.ns("Topo.link.canvas");
Topo.link.canvas.ui = function(link){
	this.link = link;
};

Topo.link.canvas.ui.prototype.paint = function(){
	this.link.ctx.beginPath();
	this.link.ctx.moveTo(this.link.from.cx , this.link.from.cy);
	this.link.ctx.lineTo(this.link.to.cx , this.link.to.cy);
	this.link.ctx.closePath();
	this.link.ctx.stroke();
};