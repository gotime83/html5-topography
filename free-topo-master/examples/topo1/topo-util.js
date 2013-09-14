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
 * topo utils
 * @author zouxuejun
 */


TopoUtil = new Object();

TopoUtil.getContext = function (canvasName){
	
	var  canvas = document.getElementById(canvasName); 
	
	return canvas.getContext('2d');
	
};

TopoUtil.createImage = function(url){
	var image = new Image();
	
	image.src = url;
};

TopoUtil.getAppropriateText  = function(text, ctx, maxWidth){
	
	var textWidth = ctx.measueText(text);
	
	if(textWidth < maxWidth){
		return text;
	}
	
	//TODO reduce text here
	
	return text;
};

