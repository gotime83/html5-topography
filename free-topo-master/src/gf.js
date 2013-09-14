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
 * Graphic Framework
 * @author zouxuejun
 * @author buhe
 */

if (typeof (GF) == "undefined")
	GF = {};

/** 继承框架 */
GF.extend = function(subClass, baseClass) {  
	 
	   function inheritance() {}
	   inheritance.prototype = baseClass.prototype;  
	   subClass.prototype = new inheritance();  
	   subClass.prototype.constructor = subClass;
	   //invoke base constructor  
	   subClass.baseConstructor = baseClass;
	   //invoke base method  
	   subClass.superClass = baseClass.prototype;  
	 
};


GF.Point = function(x, y){
	this.x = x;
	this.y = y;
};

GF.Rectangle = function(x, y, width, height){
	
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.height = height;
	
	if(typeof GF.Rectangle._initialized == "undefined"){
		GF.Rectangle.prototype.getLocation = function(){
			return new GF.Point(this.x, this.y);
		};
		GF.Rectangle.prototype.contains = function(point){
			return ( point.x > this.x && point.x < this.x + this.width )
				&& ( point.y > this.y && point.y < this.y + this.height);
		};
		GF.Rectangle._initialized = true;
	}
};

GF.Line = function(from, to){
	this.from = from;
	this.to = to;
};

GF.Layer = function(name,index,width,height){
	this.canvas = document.createElement("canvas");
	this.canvas.id = name;
	this.canvas.width = width;
	this.canvas.height = height;
	this.canvas.style['position'] = 'absolute';
	this.canvas.style['z-index'] = index;
	
	if(typeof GF.Layer._initialized == "undefined"){
		GF.Layer.prototype.getContext = function(){
			return this.canvas.getContext("2d");
		};
		GF.Layer.prototype.getCanvas = function(){
			return this.canvas;
		};
		GF.Layer._initialized = true;
	}
}

GF.Graphic = function(htmlEmId){
	
	/** id of parent html element */
	this.htmlEmId = htmlEmId;
	

	this.parentHtmlEm = document.getElementById(htmlEmId);
	
	this.width = this.parentHtmlEm.offsetWidth;
	this.height = this.parentHtmlEm.offsetHeight;
	
	//cache
	this.ctx = {}
	
	this.layer = {}

	this.defaultLayer = ['background','graphic','event'];
	
	// this.currentLayerName = null;
	
	if(typeof GF.Graphic._initialized == "undefined"){
		
		GF.Graphic.prototype.getContext = function(/*option*/layerName){
			layerName = this.deciedLayerName(layerName);
			if(typeof this.ctx[layerName] == 'undefined'){
				var layer = this.getLayer(layerName);
				if(typeof layer == 'undefined' || layer == null){
					console.log('Not exsits layer : ' + layerName);
					throw new Error('Not exsits layer : ' + layerName);
				}
				this.ctx[layerName] = layer.getContext();
			}
			return this.ctx[layerName];
		};
		
		
		
		GF.Graphic.prototype.getViewArea = function(){
			return new GF.Rectangle(0, 0, this.width, this.height);
		};
		
		GF.Graphic.prototype.drawLine = function(line, style,/*option*/layerName){
			
			var ctx = this.getContext(layerName);
			ctx.strokeStyle = style;
			ctx.beginPath();
			
			ctx.lineWidth = 1;
			ctx.moveTo(line.from.x, line.from.y);
			ctx.lineTo(line.to.x, line.to.y);

			ctx.closePath();
			ctx.stroke();

		
		};
		
		GF.Graphic.prototype.drawRect = function(rect, style,/*option*/ lineWidth, /*option*/layerName){
						
			var ctx = this.getContext(layerName);
			
			var location = rect.getLocation();
			
			
			
			ctx.beginPath();
			ctx.rect(location.x, location.y, rect.width, rect.height);
			
			ctx.strokeStyle = style;
			if(lineWidth=='undefined'){
				lineWidth = 1;
			}
			ctx.lineWidth = lineWidth;
			ctx.stroke();
		
		};
		
		GF.Graphic.prototype.fillRect = function(rect, style,/*option*/layerName){
			
			var ctx = this.getContext(layerName);
			
			ctx.fillStyle = style;
			
	        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
		};
		
		GF.Graphic.prototype.clearRect = function(rect,/*option*/layerName){
			var ctx = this.getContext(layerName);
			ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
		};
		
		/** draw cycle */
		GF.Graphic.prototype.drawArc = function(x, y, radius, style,/*option*/layerName){
			
			var ctx = this.getContext(layerName);
			
			ctx.strokeStyle = style;
			
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.arc(x, y, radius, 0, Math.PI*2);
			ctx.stroke();
			ctx.closePath();
		};
		
		/**
		 * area is a rectangle
		 */
		GF.Graphic.prototype.drawImageByUrl = function(url, area,/*option*/layerName){
			
			var ctx = this.getContext(layerName);
			var image = new Image();
			
			image.src = url;
			image.onload = function() {
				ctx.drawImage(image, area.x, area.y, area.width, area.height);
			};
			
		};
		
		/**
		 * area is a rectangle
		 */
		GF.Graphic.prototype.drawImage = function(image, area,/*option*/layerName){
			
			var ctx = this.getContext(layerName);
			
			ctx.drawImage(image, area.x, area.y, area.width, area.height);
			
			
		};
		
		GF.Graphic.prototype.drawText = function(text, area, style,/*option*/layerName){
			
			this.drawText(text, area, style, 'center');
			
		};
		
		GF.Graphic.prototype.drawText = function(text, area, style, textAlign,/*option*/layerName){
			var ctx = this.getContext(layerName);
			
			ctx.fillStyle = style;
			ctx.textAlign = textAlign;
				
			var location = area.getLocation();
			
			var metric = ctx.measureText(text);
			var textWidth = metric.width;
			
			
			ctx.fillText(text, location.x + (area/2), location.y + area - 7.5, area.width);
			
		};
		
		GF.Graphic.prototype.on = function(event,handler){
			//getEventLayer
			var layer = this.getLayer('event');
			
			layer.getCanvas()[event] = handler;
		}
		
		GF.Graphic.prototype.addLayer = function(name,index){
			this.layer[name] = new GF.Layer(name,index,this.width,this.height);
			this.parentHtmlEm.appendChild(this.layer[name].getCanvas());
		}
		
		GF.Graphic.prototype.removeLayer = function(name){
			this.parentHtmlEm.removeChild(this.layer[name]);
			delete this.layer[name];
		}
		
		GF.Graphic.prototype.getLayer = function(name){
			return this.layer[name];
		}
		
		GF.Graphic.prototype.getWidth = function(){
			return this.width;
		}
		
		GF.Graphic.prototype.getHeight = function(){
			return this.height;
		}
		
		//private~~
		GF.Graphic.prototype.initDefaultLayer = function(){
			for(var index in this.defaultLayer){
				this.addLayer(this.defaultLayer[index] , index);
			}
		}
		
		//private ~~~
		GF.Graphic.prototype.deciedLayerName = function(layerName){
			if(typeof layerName == "undefined"){
				return 'graphic';
			}else{
				return layerName;
			}
		}
		
		this.initDefaultLayer();
		GF.Graphic._initialized = true;
		
	}
};
