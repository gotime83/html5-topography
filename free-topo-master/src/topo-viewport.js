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
 * ViewPort Component 
 * @author zouxuejun, buhe
 */


FT.ViewPort = function(config){
	
	FT.ViewPort.baseConstructor.call(this,config);
	
	if(typeof FT.ViewPort._initialized == "undefined"){
		
		FT.ViewPort.prototype.getViewComponent = function(){
			return this.viewComponent;
		};
		
		FT.ViewPort.prototype.setViewComponent = function(viewComponent){
			this.viewComponent = viewComponent;
			this.children[0] = viewComponent;
			
			if(viewComponent!=null){
				this.viewComponent.setParent(this);  
				this.viewComponent.moveToViewRect(this.computeViewRect(new GF.Point(0, 0)));
			}
			
		};
		
		FT.ViewPort.prototype.computeViewRect = function(location){
			
			var x = location.x > 0?location.x:0;
			var y = location.y > 0?location.y:0;
			
			var viewArea = this.getGraphic().getViewArea();
			return new GF.Rectangle(x, y, viewArea.width, viewArea.height);
			
		};
		
		FT.ViewPort.prototype.moveToViewRect = function(viewRect){
			
			this.viewComponent.moveToViewRect(viewRect);
			this.paint();
		};
		
		FT.ViewPort.prototype.canMoveViewRect = function(viewRect){
			var realRect = getRealSize();
			
			if(viewRect.getLocation().x < 0 || viewRect.getLocation().y < 0){
				return false;
			}
			
			if(viewRect.getLocation().x > realRect.width ||
					viewRect.getLocation().y > realRect.height){
				return false;
			}
			return true;
		};
		
		
		
		FT.ViewPort.prototype.getRealSize = function(){
			return this.viewComponent.getSize();
		};
		
		FT.ViewPort.prototype.paint = function(){
			this.viewportUI.draw();
		};
		
		
		FT.ViewPort._initialized = true;
	}

	this.scale = 1.0;
	
	this.parent = null;
	
	this.parentEmId = config.parentEmId;
	

	this.viewportUI = new FT.ViewportUI(this);
	
	
	
};

FT.extend(FT.ViewPort,FT.Component);

FT.ViewportUI = function(viewport){
	
	this.viewport = viewport;
	var self = this;
	
//	this.viewport.getGraphic().on('onmousedown' ,function(e){
//		
//		var point = new GF.Point(event.offsetX, event.offsetY);
//		if(!self.isPointAtController(point)){
//			return;
//		}
//		var component = self.viewport.getViewComponent();
//		var rect = component.getViewRect();
//		var newRect = new GF.Rectangle(rect.x,rect.y + 100,rect.width,rect.height);
//		component.moveToViewRect(newRect);
//		self.draw();
//	});
	
	this.viewport.on("mouseup", function(e){

		
		var point = new GF.Point(event.offsetX, event.offsetY);
		if(!self.isPointAtController(point)){
			return;
		}
		//TODO - not yet implemented,for test,move 100 when click. 
		var component = self.viewport.getViewComponent();
		var rect = component.getViewRect();
		var newRect = new GF.Rectangle(rect.x,rect.y + 100,rect.width,rect.height);
		component.moveToViewRect(newRect);
		self.draw();
		
	});
	
	
	this.controllerPosition = new GF.Point(40, 40);
	this.controllerRadius = 30;
	this.controllerRect = new GF.Rectangle(this.controllerPosition.x - this.controllerRadius, this.controllerPosition.y - this.controllerRadius, 
			this.controllerRadius * 2, this.controllerRadius * 2);
	
	if(typeof FT.ViewportUI._initialized == "undefined"){
		
		FT.ViewportUI.prototype.draw = function(){
			
			this.viewport.getViewComponent().paint();
			
			this.drawController();
		};
		
		FT.ViewportUI.prototype.drawController = function(){
			
			var style = "#00FFFF";
			//TODO draw view controller here
			var x = this.controllerPosition.x;// point.x of cycle center 
			var y = this.controllerPosition.y;// point.y of cycle center
			this.viewport.getGraphic().drawArc(x, y, this.controllerRadius, style, 'event');
		
			this.viewport.getGraphic().drawRect(this.controllerRect, style, 'event');
		};
		
		FT.ViewportUI.prototype.isPointAtController = function(point){
			
			if( (point.x > this.controllerRect.x && point.x < this.controllerRect.width) &&
					 (point.y > this.controllerRect.y &&  point.y < this.controllerRect.height)){
				return true;
			}
			return false;
		};
		
		FT.ViewportUI._initialized = true;
	}
};
