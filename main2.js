(function($){
	//フラグ関係
	var flag_b = true;

	//画像関連
	var img;
	var imgB;
	var imgC;
	var qrimgtext;
	var qrimgtextB;
	var qrimgtextC;
	var img2;
	var guidelineImage;
	var stage;

	//画像ロード
	function loadImage (imageData, logoImageData, logoImageDataB, logoImageDataC, imageIni, imageIniB, imageIniC, guidelineflag){
		
		var baseImg = new Image();
		baseImg.src = './frame2.png';
		$('#alert').text('URL化しています');
		img = new createjs.Bitmap(baseImg);
		$('#result').attr({
			'width': baseImg.width,
			'height': baseImg.height
		});
	

		//画像が選択されている時のみ合成
		if(imageData !== null) {
			var baseImg2 = new Image();
			baseImg2.src = imageData;
			img2 = new createjs.Bitmap(baseImg2);
		}

		stage = new createjs.Stage('result');
	}

	//ロゴを合成する処理
	function genImage (imageIni, imageIniB, imageIniC, imageIniGuideline, guidelineflag){
		

		//ステージ生成
		if(img != null){
			try{
				img2 = modifyImage(img2, imageIni);
				stage.addChild(img2);
			} catch(e){
			}
		}

		if(img != null){
			try{
				stage.addChild(img);
			} catch(e){
			}
		}


		$('#alert').text('合成作業開始です ステップ 6');


		//ステージ反映
		stage.update();
		$('#alert').text('合成作業開始です ステップ 7');
	}

	function modifyImage(img, imageIni){
		$('#alert').text('合成作業開始です ステップ 1');
		//合成画像の設定
		//回転
		img.rotation = imageIni.rotation;
		//回転の中心は、画像の中央
		img.regX = img.getBounds().width / 2;
		img.regY = img.getBounds().height / 2;
		$('#alert').text('合成作業開始です ステップ 2');
	
		//上下は10ピクセルごと移動
		// 中央点からの補正
		//拡縮に二乗で補正。縮小するときに一気に縮小しないように
		var scale = 1 + imageIni.Scale / 50;
		if(scale > 0 || scale <= 1){
			scale = scale * scale;
		} else if(scale <= 0){
			scale = 0;
		}
		img.x = imageIni.xPos * 10 + img.getBounds().width / 2 * scale;
		img.y = imageIni.yPos * 10 + img.getBounds().height / 2 * scale;
		$('#alert').text('合成作業開始です ステップ 3');

		img.scaleX = img.scaleX * scale;
		img.scaleY = img.scaleY * scale;
		$('#alert').text('合成作業開始です ステップ 4');


		//透明化
		img.alpha = imageIni.alpha;	
		$('#alert').text('合成作業開始です ステップ 5');

		//上下左右反転
		img.scaleX = img.scaleX * imageIni.ScaleXFlag;
		img.scaleY = img.scaleY * imageIni.ScaleYFlag;

		return img;
	}

	$(function(){
		var userAgent = window.navigator.userAgent.toLowerCase();
		// IEとEdge判定
		if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1)  {
			flag_b = false;
		} else if(userAgent.indexOf('edge') != -1) {
			flag_b = false;
		} else {
			flag_b = true;
			
		}

		// logourlが使えない場合、UIを一部隠す
		//if(!flag_b){
		//	$(".no_ie_edge").hide();
		//}

		//設定のデフォルト値
		//if(flag_b){
			//$('#logourl').val('./default.png');
			$('#guidelineurl').val('./guideline.svg');
			loadlogocanvas('./frame2.png', false);
		//}
	
		//ロゴURL変更時の処理
		$(document).on('input', '#logourl', function() {
			$.ajax({
				url: $('#logourl').val()
			}).done(function(data){
				var baseImg = new Image();
				baseImg.src = $('#logourl').val();
				img = new createjs.Bitmap(baseImg);
				$('#alert').text('');
				//URL再生成
				write_settingurl(imageIni);
				loadlogocanvas($('#logourl').val(), false);
			}).fail(function(data){
				$('#alert').text('ロゴのURLが間違っています。ヒント：httpsから始まるURLにしてください。');
			});
		});
		$(document).on('input', '#logourlB', function() {
			$.ajax({
				url: $('#logourlB').val()
			}).done(function(data){
				var baseImg = new Image();
				baseImg.src = $('#logourlB').val();
				imgB = new createjs.Bitmap(baseImg);
				$('#alert').text('');
				//URL再生成
				write_settingurl(imageIni);
				loadlogocanvas($('#logourlB').val(), false);
			}).fail(function(data){
				$('#alert').text('ロゴのURLが間違っています。ヒント：httpsから始まるURLにしてください。');
			});
		});
		$(document).on('input', '#logourlC', function() {
			$.ajax({
				url: $('#logourlC').val()
			}).done(function(data){
				var baseImg = new Image();
				baseImg.src = $('#logourlC').val();
				imgC = new createjs.Bitmap(baseImg);
				$('#alert').text('');
				//URL再生成
				write_settingurl(imageIni);
				loadlogocanvas($('#logourlC').val(), false);
			}).fail(function(data){
				$('#alert').text('ロゴのURLが間違っています。ヒント：httpsから始まるURLにしてください。');
			});
		});

		$(document).on('input', '#qrtext', function() {
			$("#qrdiv").empty();
			var qrtext = $('#qrtext').val();
			$('#qrdiv').qrcode(qrtext);
			var qrcanvas = $('#qrdiv').children('canvas');
		    qrimgtext = qrcanvas[0].toDataURL('image/png');
		});
		$(document).on('input', '#qrtextB', function() {
			$("#qrdivB").empty();
			var qrtext = $('#qrtextB').val();
			$('#qrdivB').qrcode(qrtext);
			var qrcanvas = $('#qrdivB').children('canvas');
		    qrimgtextB = qrcanvas[0].toDataURL('image/png');
		});
		$(document).on('input', '#qrtextC', function() {
			$("#qrdivC").empty();
			var qrtext = $('#qrtextC').val();
			$('#qrdivC').qrcode(qrtext);
			var qrcanvas = $('#qrdivC').children('canvas');
		    qrimgtextC = qrcanvas[0].toDataURL('image/png');
		});

		//読込画像のオブジェクト
		var imageIni = {
			xPos : 0,
			yPos : 0,
			Scale : 0,
			rotation : 0,
			alpha : 1.0,
			ScaleXFlag : 1.0,
			ScaleYFlag : 1.0,
			imageData : null,
			logoImageData : null,
			guidelineImageData : null,
			resetImage : function(){
				this.xPos = 0;
				this.yPos = 0;
				this.Scale = 0;
				this.rotation = 0;
				this.alpha = 1.0;
			},
			makeImage : function(guidelineflag){
				if(this.imageData !== null) {
					$('#alert').text('合成画像読み込み中です。');
					loadImage(this.imageData, this.logoImageData, imageIniB.logoImageDataB, imageIniC.logoImageDataC, imageIni, imageIniB, imageIniC, guidelineflag);
					$('#alert').text('合成画像 合成中です。');
					genImage(this, imageIniB, imageIniC, imageIniGuideline, guidelineflag);
				}
			}
		};
		var imageIniB = {
			xPos : 2,
			yPos : 2,
			Scale : -5,
			rotation : 0,
			alpha : 1.0,
			ScaleXFlag : 1.0,
			ScaleYFlag : 1.0,
			imageData : null,
			logoImageDataB : null,
			guidelineImageData : null,
			resetImage : function(){
				this.xPos = 2;
				this.yPos = 2;
				this.Scale = -5;
				this.rotation = 0;
				this.alpha = 1.0;
			},
			makeImage : function(guidelineflag){
				if(this.imageData !== null) {
					$('#alert').text('合成画像読み込み中です。');
					loadImage(this.imageData, imageIni.logoImageData, this.logoImageDataB, imageIniC.logoImageDataC, imageIni, imageIniB, imageIniC, guidelineflag);
					$('#alert').text('合成画像 合成中です。');
					genImage(imageIni, this, imageIniC, imageIniGuideline, guidelineflag);
				}
			}
		};
		var imageIniC = {
			xPos : 2,
			yPos : 2,
			Scale : -5,
			rotation : 0,
			alpha : 1.0,
			ScaleXFlag : 1.0,
			ScaleYFlag : 1.0,
			imageData : null,
			logoImageDataC : null,
			guidelineImageData : null,
			resetImage : function(){
				this.xPos = 2;
				this.yPos = 2;
				this.Scale = -5;
				this.rotation = 0;
				this.alpha = 1.0;
			},
			makeImage : function(guidelineflag){
				if(this.imageData !== null) {
					$('#alert').text('合成画像読み込み中です。');
					loadImage(this.imageData, imageIni.logoImageData, imageIniB.logoImageDataB, this.logoImageDataC, imageIni, imageIniB, imageIniC, guidelineflag);				
					$('#alert').text('合成画像 合成中です。');
					genImage(imageIni, imageIniB, this, imageIniGuideline, guidelineflag);
				}
			}
		};
		var imageIniGuideline = {
			xPos : -20,
			yPos : -105,
			Scale : 48,
			rotation : 0,
			alpha : 0.0,
			ScaleXFlag : 1.0,
			ScaleYFlag : 1.0,
			imageData : null,
			resetImage : function(){
				this.xPos = -20;
				this.yPos = -105;
				this.Scale = 48;
				this.rotation = 0;
				this.alpha = 1.0;
			},
		};


		//get情報
		var url = location.href;
		var parameters = url.split('?');
		var queries = (parameters[1] || 'dummy=dummy').split('&');
		i = 0;

		for(i; i < queries.length; i ++) {
			var t = queries[i].split('=');
			if(t['0'] == 'logourl'){
				$('#logourl').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos'){
				imageIni.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos'){
				imageIni.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale'){
				imageIni.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'rotation'){
				imageIni.rotation = parseFloat(t['1']);
			} else if(t['0'] == 'alpha'){
				imageIni.alpha = parseFloat(t['1']);
			} else if(t['0'] == 'logo'){
				if(t['1'] == 'local'){
					$('input[name=logo]').val(['local']);
				}
				if(t['1'] == 'local_white'){
					$('input[name=logo]').val(['local_white']);
				}
			} else if(t['0'] == 'title'){
				$('title').text(decodeURIComponent(t['1']));
				$('h1').text(decodeURIComponent(t['1']));
			} else if(t['0'] == 'comment'){
				$('#comment').text(decodeURIComponent(t['1']));
			}
		}

		//イベント関連処理
		//画像読込
		$('#getfile').change(function (){
			//読み込み
			var fileList =$('#getfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);

			//読み込み後
			$(reader).on('load',function(){
				$('#preview').prop('src',reader.result);
				imageIni.imageData = reader.result;
			});
		});

		// tabA
		//ロゴ画像読込
		$('#logogetfile').change(function (){
			//読み込み
			var fileList =$('#logogetfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.logoImageData = reader.result;
				loadlogocanvas(reader.result, false);
			});
		});

		//ロゴ画像読込(白抜き)
		$('#logogetfilealpha').change(function (){
			//読み込み
			var fileList =$('#logogetfilealpha').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.logoImageData = reader.result;
				loadlogocanvas(reader.result, true);
			});
		});

		function loadlogocanvas(url, flag){
			var image = new Image();
			image.onload = function() {
				$('#canvas').attr({
					'width': image.width,
					'height': image.height
				});
				var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
 				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
				var data = imageData.data;
				for (var i = 0; i < data.length; i += 4) {
					//各カラーチャンネルで、一番暗い値を取得
					var minLuminance = 255;
					if(data[i] < minLuminance)
						minLuminance = data[i];
					if(data[i + 1] < minLuminance)
						minLuminance = data[i + 1];
					if(data[i + 2] < minLuminance)
						minLuminance = data[i + 2];

					if(flag){
						//一番暗い値を、アルファチャンネルに反映(明るいところほど透明に)
						data[i + 3] = 255 - minLuminance;
					}
				}
				context.putImageData(imageData, 0, 0);
			};
			image.src = url;
		}

		$('#default-logo').change(function (){
			//デフォルトロゴ読み込み
			var logo = "./default-logo/" + $("#default-logo").val() + ".png";
			console.log(logo);
			$("#logourl").val(logo);
			$("#default-logo-img").attr("src", logo);
		});

		//tabB
		//ロゴ画像読込
		$('#logogetfileB').change(function (){
			//読み込み
			var fileList =$('#logogetfileB').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIniB.logoImageDataB = reader.result;
				loadlogocanvasB(reader.result, false);
			});
		});
		
		//ロゴ画像読込(白抜き)
		$('#logogetfilealphaB').change(function (){
			//読み込み
			var fileList =$('#logogetfilealphaB').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIniB.logoImageDataB = reader.result;
				loadlogocanvasB(reader.result, true);
			});
		});
		
		function loadlogocanvasB(url, flag){
			var image = new Image();
			image.onload = function() {
				$('#canvasB').attr({
					'width': image.width,
					'height': image.height
				});
				var canvas = document.getElementById('canvasB');
				var context = canvas.getContext('2d');
				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
				var data = imageData.data;
				for (var i = 0; i < data.length; i += 4) {
					//各カラーチャンネルで、一番暗い値を取得
					var minLuminance = 255;
					if(data[i] < minLuminance)
						minLuminance = data[i];
					if(data[i + 1] < minLuminance)
						minLuminance = data[i + 1];
					if(data[i + 2] < minLuminance)
						minLuminance = data[i + 2];
		
					if(flag){
						//一番暗い値を、アルファチャンネルに反映(明るいところほど透明に)
						data[i + 3] = 255 - minLuminance;
					}
				}
				context.putImageData(imageData, 0, 0);
			};
			image.src = url;
		}

		$('#default-logoB').change(function (){
			//デフォルトロゴ読み込み
			var logo = "./default-logo/" + $("#default-logoB").val() + ".png";
			console.log(logo);
			$("#logourlB").val(logo);
			$("#default-logo-imgB").attr("src", logo);
		});

		//tabC
		//ロゴ画像読込
		$('#logogetfileC').change(function (){
			//読み込み
			var fileList =$('#logogetfileC').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIniC.logoImageDataC = reader.result;
				loadlogocanvasC(reader.result, false);
			});
		});
		
		//ロゴ画像読込(白抜き)
		$('#logogetfilealphaC').change(function (){
			//読み込み
			var fileList =$('#logogetfilealphaC').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIniC.logoImageDataC = reader.result;
				loadlogocanvasC(reader.result, true);
			});
		});
		
		function loadlogocanvasC(url, flag){
			var image = new Image();
			image.onload = function() {
				$('#canvasC').attr({
					'width': image.width,
					'height': image.height
				});
				var canvas = document.getElementById('canvasC');
				var context = canvas.getContext('2d');
				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
				var data = imageData.data;
				for (var i = 0; i < data.length; i += 4) {
					//各カラーチャンネルで、一番暗い値を取得
					var minLuminance = 255;
					if(data[i] < minLuminance)
						minLuminance = data[i];
					if(data[i + 1] < minLuminance)
						minLuminance = data[i + 1];
					if(data[i + 2] < minLuminance)
						minLuminance = data[i + 2];
		
					if(flag){
						//一番暗い値を、アルファチャンネルに反映(明るいところほど透明に)
						data[i + 3] = 255 - minLuminance;
					}
				}
				context.putImageData(imageData, 0, 0);
			};
			image.src = url;
		}

		$('#default-logoC').change(function (){
			//デフォルトロゴ読み込み
			var logo = "./default-logo/" + $("#default-logoC").val() + ".png";
			console.log(logo);
			$("#logourlC").val(logo);
			$("#default-logo-imgC").attr("src", logo);
		});

		//ボタンイベントまとめ
		var editgenerator_button = "";
		var flag = 0;
		// 加速機能
		const boost_limit = 5;
		const boost_value = 3;
		const boost_not_value = 1;
		var boost_count = 0;
		const boost_id_default = "boost";
		var boost_id = boost_id_default;
		function is_longpress(id){
			if(boost_id == id || pushing_flag == 0){
				return true;
			}
			boost_id = id;
			return false;
		}
		function boost(id){
			if(boost_id === id){
				boost_count += 1;
			} else {
				boost_count = 0;
				boost_id = id;
			}
			if(boost_count >= boost_limit){
				return boost_value;
			}
			return boost_not_value;
		}
		function editgenerator(id){
			if(flag == 0){
				flag = 1;
				return;
			} else {
				flag = 0;
			}
			if (id === 'update'){
			//tabA
			}else if (id === 'up'){
				imageIni.yPos -= 1*boost(id);
			}else if (id === 'down'){
				imageIni.yPos += 1*boost(id);
			}else if (id === 'left'){
				imageIni.xPos -= 1*boost(id);
			}else if (id === 'right') {
				imageIni.xPos += 1*boost(id);
			}else if (id === 'zoomin') {
				imageIni.Scale += 1*boost(id);
			}else if (id === 'zoomout') {
				imageIni.Scale -= 1*boost(id);
			}else if (id === 'rotation_r') {
				imageIni.rotation += 7.5*boost(id);
			}else if (id === 'rotation_l') {
				imageIni.rotation -= 7.5*boost(id);
			}else if (id === 'alpha_up') {
				imageIni.alpha += 0.1*boost(id);
				if(imageIni.alpha >= 0.9){
					imageIni.alpha = 1.0;
					$('#alpha_up').prop("disabled", true);
				}
				$('#alpha_down').prop("disabled", false);
			}else if (id === 'alpha_down') {
				imageIni.alpha -= 0.1*boost(id);
				if(imageIni.alpha <= 0.1){
					imageIni.alpha = 0.0;
					$('#alpha_down').prop("disabled", true);
				}
				$('#alpha_up').prop("disabled", false);
			}else if (id === 'reset'){
				imageIni.resetImage();
				boost(id)
				$('#alpha_up').prop("disabled", true);
				$('#alpha_down').prop("disabled", false);
			// tabB
			}else if (id === 'upB'){
				imageIniB.yPos -= 1*boost(id);
			}else if (id === 'downB'){
				imageIniB.yPos += 1*boost(id);
			}else if (id === 'leftB'){
				imageIniB.xPos -= 1*boost(id);
			}else if (id === 'rightB') {
				imageIniB.xPos += 1*boost(id);
			}else if (id === 'zoominB') {
				imageIniB.Scale += 1*boost(id);
			}else if (id === 'zoomoutB') {
				imageIniB.Scale -= 1*boost(id);
			}else if (id === 'rotation_rB') {
				imageIniB.rotation += 7.5*boost(id);
			}else if (id === 'rotation_lB') {
				imageIniB.rotation -= 7.5*boost(id);
			}else if (id === 'alpha_upB') {
				imageIniB.alpha += 0.1*boost(id);
				if(imageIniB.alpha >= 0.9){
					imageIniB.alpha = 1.0;
					$('#alpha_upB').prop("disabled", true);
				}
				$('#alpha_downB').prop("disabled", false);
			}else if (id === 'alpha_downB') {
				imageIniB.alpha -= 0.1*boost(id);
				if(imageIniB.alpha <= 0.1){
					imageIniB.alpha = 0.0;
					$('#alpha_downB').prop("disabled", true);
				}
				$('#alpha_upB').prop("disabled", false);
			}else if (id === 'resetB'){
				imageIniB.resetImage();
				boost(id)
				$('#alpha_upB').prop("disabled", true);
				$('#alpha_downB').prop("disabled", false);
			//tabC
			}else if (id === 'upC'){
				imageIniC.yPos -= 1*boost(id);
			}else if (id === 'downC'){
				imageIniC.yPos += 1*boost(id);
			}else if (id === 'leftC'){
				imageIniC.xPos -= 1*boost(id);
			}else if (id === 'rightC') {
				imageIniC.xPos += 1*boost(id);
			}else if (id === 'zoominC') {
				imageIniC.Scale += 1*boost(id);
			}else if (id === 'zoomoutC') {
				imageIniC.Scale -= 1*boost(id);
			}else if (id === 'rotation_rC') {
				imageIniC.rotation += 7.5*boost(id);
			}else if (id === 'rotation_lC') {
				imageIniC.rotation -= 7.5*boost(id);
			}else if (id === 'alpha_upC') {
				imageIniC.alpha += 0.1*boost(id);
				if(imageIniC.alpha >= 0.9){
					imageIniC.alpha = 1.0;
					$('#alpha_upC').prop("disabled", true);
				}
				$('#alpha_downC').prop("disabled", false);
			}else if (id === 'alpha_downC') {
				imageIniC.alpha -= 0.1*boost(id);
				if(imageIniC.alpha <= 0.1){
					imageIniC.alpha = 0.0;
					$('#alpha_downC').prop("disabled", true);
				}
				$('#alpha_upC').prop("disabled", false);
			}else if (id === 'resetC'){
				imageIniC.resetImage();
				boost(id)
				$('#alpha_upC').prop("disabled", true);
				$('#alpha_downC').prop("disabled", false);
			}else if (id === 'guide'){
				imageIniGuideline.alpha = 1.0;
			}else if (id === 'unguide'){
				imageIniGuideline.alpha = 0.0;
			}else if (id === 'upG'){
				imageIniGuideline.yPos -= 1*boost(id);
			}else if (id === 'downG'){
				imageIniGuideline.yPos += 1*boost(id);
			}else if (id === 'leftG'){
				imageIniGuideline.xPos -= 1*boost(id);
			}else if (id === 'rightG') {
				imageIniGuideline.xPos += 1*boost(id);
			}else if (id === 'zoominG') {
				imageIniGuideline.Scale += 1*boost(id);
			}else if (id === 'zoomoutG') {
				imageIniGuideline.Scale -= 1*boost(id);
			}else if (id === 'rotation_rG') {
				imageIniGuideline.rotation += 7.5*boost(id);
			}else if (id === 'rotation_lG') {
				imageIniGuideline.rotation -= 7.5*boost(id);
			}else if (id === 'upsidedownG') {
				//長押しで反応しないように
				if(!is_longpress(id)){
					imageIniGuideline.ScaleYFlag = imageIniGuideline.ScaleYFlag * (-1.0);
					//ガイドラインの画像ずれ修正
					if(imageIniGuideline.ScaleYFlag > 0){
						imageIniGuideline.yPos += 5;
					} else {
						imageIniGuideline.yPos -= 5;
					}
				}
			}else if (id === 'leftsiderightG') {
				if(!is_longpress(id)){
					imageIniGuideline.ScaleXFlag = imageIniGuideline.ScaleXFlag * (-1.0);
				}
			}else if (id === 'dl'){
				return;
			}
			
			//画像操作時は再描画を行う
			if(imageIni.imageData !== null){
				alertmeg('合成作業開始中です。');
				imageIni.makeImage(true);
				alertmeg('合成完了です！');
			}else{
				alertmeg('スクリーンショットを入力してから画像生成を行ってください');
			}

			//画面操作時はURLを再生成する
			write_settingurl(imageIni);
		}
		//$('.btn').on('click', function(e){
		//	editgenerator_button = e.target.id;
		//	editgenerator(editgenerator_button);
		//});

		var pushing_flag = 0;
		var mouse_push_hold = function(){
			editgenerator(editgenerator_button);
			if( pushing_flag == 1 ){
				setTimeout(mouse_push_hold, 100);
			}
		};

		// PC用
		$(".editgenerator").mousedown(function(e){
			editgenerator_button = e.target.id;
			pushing_flag = 1;
			setTimeout(mouse_push_hold, 1);
			return false;
		}).mouseup(function(){
			pushing_flag = 0;
			clearTimeout(mouse_push_hold);
			boost(boost_id_default);
		}).mouseleave(function(){
			pushing_flag = 0;
			clearTimeout(mouse_push_hold);
			boost(boost_id_default);
		}).mouseover(function(){
			pushing_flag = 0;
			clearTimeout(mouse_push_hold);
		});

		//スマホ用
		$(".editgenerator").bind('touchstart', function(e){
			editgenerator_button = e.target.id;
			pushing_flag = 1;
			setTimeout(mouse_push_hold, 1);
			return false;
		});
		$(".editgenerator").bind('touchend', function(e){
			pushing_flag = 0;
			boost(boost_id_default);
			return false;
		});




		$('input[name=logo]').click(function() {
			//チェックボックス操作時は再描画を行う
			if(imageIni.imageData !== null){
				imageIni.makeImage(true);
			}else{
				alertmeg('スクリーンショットを入力してから画像生成を行ってください');
			}

			//チェックボックス操作時はURLを再生成する
			write_settingurl(imageIni);
		});

		//初回URL生成
		write_settingurl(imageIni);

		//Canvas Download
		$('.btnDownload').on("click", function() {
			alertmeg('ダウンロード ボタンクリック');
			//ガイドライン抜きの画像を生成
			if(imageIni.imageData !== null){
				alertmeg('合成作業開始中です。');
				imageIni.makeImage(false);
				alertmeg('合成完了です！');
			}else{
				alertmeg('スクリーンショットを入力してから画像生成を行ってください');
			}
			//if($('input[name=logo]:checked').val() === 'local'){
				DownloadStart();
			//} else if($('input[name=logo]:checked').val() === 'local_white'){
			//	DownloadStart();
			//} else {
			//	alert('ロゴがURL指定のため、ダウンロードボタンは使用できません。')
			//}
			alertmeg('ダウンロード処理終了');
		});
		$('.btnNewWindow').on("click", function() {
			//ガイドライン抜きの画像を生成
			if(imageIni.imageData !== null){
				alertmeg('合成作業開始中です。');
				imageIni.makeImage(false);
				alertmeg('合成完了です！');
			}else{
				alertmeg('スクリーンショットを入力してから画像生成を行ってください');
			}
			NewWindow();
		});
	});

	//画像先読み込み
	$(window).on('load',function(){
		//画像のロード
		var baseImg = new Image();
		baseImg.src = $('#logourl').val();
		img = new createjs.Bitmap(baseImg);

		//ガイドラインのロード
		var baseImg2 = new Image();
		baseImg2.src = $('#guielineurl').val();
		guidelineImage = new createjs.Bitmap(baseImg2);

		loadImage(null, null, null, null, null);
	});

	// URL生成
	function geturl(imageIni) {
		var url;
		var baseurl = location.href.split('?')[0];
		url = baseurl;

		//設定をgetに追加
		//ロゴURL
		url = url + '?logourl=' + encodeURIComponent($('#logourl').val());
		//ロゴ位置・サイズ
		url = url + '&xpos=' + imageIni.xPos;
		url = url + '&ypos=' + imageIni.yPos;
		url = url + '&scale=' + imageIni.Scale;
		//ロゴ回転
		url = url + '&rotation=' + imageIni.rotation;
		//ロゴ透過
		url = url + '&alpha=' + imageIni.alpha;
		//ロゴ読み出し場所
		if($('input[name=logo]:checked').val() === 'local'){
			url = url + '&logo=local';
		}
		if($('input[name=logo]:checked').val() === 'local_white'){
			url = url + '&logo=local_white';
		}
		//タイトル
		url = url + '&title=' + encodeURIComponent($('title').text());
		//コメント
		url = url + '&comment=' + encodeURIComponent($('#comment').text());
		return url;
	}

	// URL書き込み
	function write_settingurl(imageIni) {
		var url = geturl(imageIni);
		$('#settingurl a').text(url);
		$('#settingurl a').attr('href', url);
	}

})($);

function DownloadStart(){
	
	var cve = document.getElementById("result");
	if (cve.getContext) {
		// ダウンロード ファイル名
		var now = new Date();
		var year = now.getYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();

		var filename = 'download_' + year + month + day + hour + min + sec + '.png';

		var ctx = cve.getContext('2d');
		var base64;
		try {
			base64 = cve.toDataURL();
		}catch(e) {
			alert("ロゴが外部URLをしているため、ダウンロードボタンを使用できません。")
			return;
		}
		document.getElementById("newImg").src = base64;

		var blob = Base64toBlob(base64);
		const url = window.URL.createObjectURL(blob);
		document.getElementById("dlImg").href = url;
		document.getElementById("dlImg").download = filename;

		//  ダウンロード開始
		if (window.navigator.msSaveBlob) {
			// IE
			window.navigator.msSaveBlob(Base64toBlob(base64), filename);
		} else {
			// Chrome, Firefox, Edge
			document.getElementById("dlImg").click();
		}
		window.URL.revokeObjectURL(url);
	}
}

function Base64toBlob(base64)
{
	var tmp = base64.split(',');
	var data = atob(tmp[1]);
	var mime = tmp[0].split(':')[1].split(';')[0];
	var buf = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
		buf[i] = data.charCodeAt(i);
	}
	var blob = new Blob([buf], { type: mime });
	return blob;
}

function NewWindow(){
	
	var cve = document.getElementById("result");
	if (cve.getContext) {
		var dataUrl;
		try {
			dataUrl = cve.toDataURL();
		}catch(e) {
			alert("ロゴが外部URLをしているため、ダウンロードボタンを使用できません。")
			return;
		}
		var w = window.open('about:blank');
		w.document.write("<img src='" + dataUrl + "'/>");
	} else {
	}
}

function alertmeg(text){
	$("#alert").text(text);
	$("#alertB").text(text);
	$("#alertC").text(text);
}
