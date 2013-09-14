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
Topo.component = (function() {
	/**
	 * 缓存图片资源,可以通过Id访问
	 */
	this.__image = {};
	this.__defaultImage = new Image();
	/**
	 * 注册图片到Topo资源库
	 * 
	 * @param id
	 * @param url
	 */
	this.registerImage = function(id, url) {
		var i = new Image();
		i.src = url;
		this.__image[id] = i;
	};

	/**
	 * 通过id返回图片对象,可以被Canvas使用
	 * 
	 * @param id
	 */
	this.lookupImage = function(id) {
		return this.__image[id] ? this.__image[id] : null;
	};

	/**
	 * 生成组件的Toolbar
	 * 
	 * @param component
	 */
	this.createToolbar = function(component) {
		var container = document.createElement("div");
		container.id = "container";
		var toolbar = document.createElement("div");

		var zoomOut = document.createElement("button");
		zoomOut.onclick = function() {
			component.zoom(2.0);
		};
		zoomOut.innerText = "Zoom Out";
		toolbar.appendChild(zoomOut);

		var zoomIn = document.createElement("button");
		zoomIn.onclick = function() {
			component.zoom(0.5);
		};
		zoomIn.innerText = "Zoom In";
		toolbar.appendChild(zoomIn);

		var zoomReset = document.createElement("button");
		zoomReset.onclick = function() {
			component.zoomReset();
		};
		zoomReset.innerText = "Zoom Reset";
		toolbar.appendChild(zoomReset);

		container.appendChild(component.canvas);
		container.appendChild(toolbar);
		document.body.appendChild(container);
	};
	/**
	 * 初始化拖拽系统
	 * 
	 * @param component
	 */
	//TODO - 这里使用了全局唯一的闭包，不合适。 应该用非全局闭包。
	this.initDD = (function() {  
		//这里比较自然的使用了闭包来保存 @selectedNode 这个值,外层函数声明即执行,返回内层函数,则内层函数被外部hold住
		//无法释放,形成闭包,连同@selectedNode 一起被保存起来
		var selectedNode;
		return function(component) {
			component.canvas.onmousemove = function(e) {
				if (!selectedNode)
					return;
				var canvas = e.target;
				var c = canvas.__object__;
				var point = c.getMouseXY(e);
				selectedNode.setXYWH(point.x, point.y, selectedNode.w,
						selectedNode.h); // 重设xy , wh 保持不变
				c.__clearAll();
				c.paint();
			};

			component.canvas.onmousedown = function(e) {
				if(e.button != 0)//非左键
					return;
				var canvas = e.target;
				var c = canvas.__object__;
				var point = c.getMouseXY(e);
				var node = c.getElementByPoint(point);
				if (node) {
					selectedNode = node;
				}
			};

			component.canvas.onmouseup = function(e) {
				selectedNode = undefined;
			};
		};
	})();
	
	this.initMenu = function(component){
		component.canvas.oncontextmenu = function(e) {
			var canvas = e.target;
			var c = canvas.__object__;
			var point = c.getMouseXY(e);
			var node = c.getElementByPoint(point);
			try{
				showMenu({
					src : component,
					target : node,
					point : point
				});
			}catch(e){
				console.info(e);
			}
			stopBubble(e);
			stopDefault(e);
		};
		
		function showMenu(e){
			if(component.menufactory){
				component.menufactory(e);
			}
		}
		
		function stopDefault(e) { //函数功能：阻止浏览器的默认行为  
		    if ( e && e.preventDefault ) {   
		          e.preventDefault(); //阻止默认浏览器动作(W3C)  
		      } else {  
		          window.event.returnValue = false; //IE中阻止函数器默认动作的方式  
		      }  
		    return false;  
		}  
		
		function stopBubble(e) { //函数功能：阻止浏览器事件冒泡  
		    if ( e && e.stopPropagation ) { //如果提供了事件对象，则这是一个非IE浏览器                
		          e.stopPropagation(); //因此它支持W3C的stopPropagation()方法  
		      } else {                
		          window.event.cancelBubble = true; //否则，我们需要使用IE的方式来取消事件冒泡  
		      }  
		}
	};
	
	this.initToolTip = function(component){
		component.canvas.onmouseover = function(e) {  //TODO - 这个事件不适合ToolTip,期待好的方案
			var canvas = e.target;
			var c = canvas.__object__;
			var point = c.getMouseXY(e);
			var node = c.getElementByPoint(point);
			showTip({
				src : component,
				target : node,
				point : point
			});
		};
		function showTip(e){
			if(component.tipfactory){
				component.tipfactory(e);
			}
		}
	};

	return this;
})();
