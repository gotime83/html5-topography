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
 * Core 
 * @author zouxuejun, buhe
 */
if (typeof (FT) == "undefined")
	FT = {};
	
FT.extend = function(subClass, baseClass) {  
 
   function inheritance() {}
   inheritance.prototype = baseClass.prototype;  
   subClass.prototype = new inheritance();  
   subClass.prototype.constructor = subClass;
   //invoke base constructor  
   subClass.baseConstructor = baseClass;
   //invoke base method  
   subClass.superClass = baseClass.prototype;  
 
};

FT.Observable = function(){
	this.listeners = {};
	if( typeof FT.Observable._initialized == "undefined") {
		//support mutli event 
		//like this.model.on('nodeChanged','linkChanged',this.topoUI.modelChangeHandler);
		FT.Observable.prototype.on = function() {
			var args=arguments;
			var length = args.length;
			if(length < 2){
				FT.error('Arguments must be bigger than 2');
				throw new Error('Arguments must be bigger than 2');
			}
			var handler = args[length - 1];
			if(typeof handler != 'function'){
				FT.error('Last argument must be function!');
				throw new Error('Last argument must be function!');
			}
			for(var i = 0; i < length - 1 ; i++){
				var eventName = args[i];
				var ls = this.listeners[eventName];
				if(typeof ls == 'undefined') {
					this.listeners[eventName] = ls = []
				}
				ls[ls.length] = handler;
			}
			
		};

		FT.Observable.prototype.fireEvent = function(eventName, event) {
			var ls = this.listeners[eventName];
			if(typeof ls == 'undefined') {
				return;
			}
			for(var l in ls) {
				try {
					ls[l].call(this, event);
				} catch(e) {
					FT.error(e);
				}
			}
		};
		
		FT.Observable._initialized = true;
	};
};

FT.info = function(msg){
	console.log(msg);
};

FT.error = function(error){
	console.log(error);
};

FT.Component = function(config){
	
	FT.Component.baseConstructor.call(this);
	this.x = 0;
	
	this.y = 0;
	
	this.width = config.width;
	
	this.height = config.height;
	
	this.children = {};
	
	this.parent = config.parent;
		
	if( typeof FT.Component._initialized == "undefined") {
		
		FT.Component.prototype.getGraphic = function(){
			if(this.graphic!=null){
				return this.graphic;
			}
			
			if(this.parent!=null){
				return this.parent.getGraphic();
			}else{
				this.graphic = new GF.Graphic(this.parentEmId);
				return this.graphic;
			}
		};
		
		FT.Component.prototype.getSize = function(){
			
			return new GF.Rectangle(this.x, this.y, this.width, this.height);
		};
		
		FT.Component.prototype.setSize = function(width, height){
			this.width = width;
			this.height = height;
		};
		
		FT.Component.prototype.getChildren = function(){
			return this.children;
		};
		
		FT.Component.prototype.getParent = function(){
			return this.parent;
		};
		
		FT.Component.prototype.setParent = function(parent){
			this.parent = parent;
		};
		
		FT.Component.prototype.onComponentEvent = function(event){
			
			
			this.fireEvent(event.eventType, event);
			
			var children = this.getChildren();
			for(var index in children){
				
				var comp = children[index];
				
				switch(event.eventType){
					case 'mousedown','mousemove','mouseup','click':
						if(comp.isPointAtComponent(new GF.Point(event.x, event.y))){
							//FIXME - ce unused ???
							var ce = new FT.ComponentEvent(comp, event.eventType);
							ce.offsetX = event.offsetX - comp.x;
							ce.offsetY = event.offsetY - comp.y;
							comp.onComponentEvent(event);
						}
						break;
					default:
						comp.onComponentEvent(event);
					
				}
					
			}
		};
		
		FT.Component.prototype.isPointAtComponent = function(point){
			
			
			if( (point.x > this.x && point.x < this.width) &&
					 (point.y > this.y &&  point.y < this.height)){
				return true;
			}
			return false;
		};
		
		FT.Component._initialized = true;
	}
};

FT.extend(FT.Component, FT.Observable);


FT.ComponentEvent = function(source, eventType){
	
	this.source = source;
	this.eventType = eventType;
	
};

FT.RootPane = function(config) {
	FT.RootPane.baseConstructor.call(this,config);
	
	this.parentEmId = config.parentEmId;
	var self = this;
	
	if(typeof FT.RootPane._initialized == "undefined") {
		
		FT.RootPane.prototype.add = function(comp){
			this.children[0] = comp;
			comp.parent = this;
			comp.width = this.width;
			comp.height = this.height;
		};
		
		
		
		FT.RootPane._initialized = true;
	}
	
	var mouseHandler =  function(event){
		
		var ce = new FT.ComponentEvent(self, event.type);
		ce.x = event.x;
		ce.y = event.y;
		ce.offsetX = event.offsetX - self.x;
		ce.offsetY = event.offsetY - self.y;
		self.onComponentEvent(ce);
	};
	
	this.width = this.getGraphic().getWidth();
	this.height = this.getGraphic().getHeight();
	
	this.getGraphic().on("onmousedown", mouseHandler);
	this.getGraphic().on("onmouseup", mouseHandler);
	this.getGraphic().on("onmousemove", mouseHandler);
	this.getGraphic().on("click", mouseHandler);
};

FT.extend(FT.RootPane, FT.Component);
/**
 * Topo config regisitry.
 * @param {Object} config
 */
FT.Config = function(config){
	
}
