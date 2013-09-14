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
 * Default Node UI based canvas  
 * @author bugu
 */
Topo.ns("Topo.node.canvas");
Topo.node.canvas.ui = function(node){
	this.node = node;
};

Topo.node.canvas.ui.prototype.paint = function(){
	if(this.node.image){
		var i = Topo.component.lookupImage(this.node.image);
		if(i){
			try{
				this.node.ctx.drawImage(i,0,0,i.width,i.height,this.node.x,this.node.y,this.node.w,this.node.h);
			}catch(e){
				this.node.ctx.fillRect(this.node.x,this.node.y,this.node.w,this.node.h);
			}
		}else{
			this.node.ctx.fillRect(this.node.x,this.node.y,this.node.w,this.node.h);
		}
	}else{
		this.node.ctx.fillRect(this.node.x,this.node.y,this.node.w,this.node.h);
	}
};