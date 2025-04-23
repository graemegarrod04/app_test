/*$Id$*/

$(document).ready(function() {
	var isMobPanelOpen = false;
	$('#zcRightMenu').click(function() {
		isMobPanelOpen = !isMobPanelOpen;
		$('#headerRightContainer').toggleClass('zc-menu-open');
	});
	$('#zcAppName').click(function() {
		if(isMobPanelOpen) {
			$('#zcRightMenu').trigger('click');
			isMobPanelOpen = false;
		}
		$('#defaultContainer').removeClass('zc-hide');
		$('#zcBodyWrapper').addClass('zc-hide');
		$('#headerList li').removeClass('active');
		$('#zcBodyWrapper').children('div').addClass('zc-hide');
	});
	$('#headerList li').click(function() {
		if(isMobPanelOpen) {
			$('#zcRightMenu').trigger('click');
			isMobPanelOpen = false;
		}
		$('#defaultContainer').addClass('zc-hide');
		$('#zcBodyWrapper').removeClass('zc-hide');
		$('#headerList li').removeClass('active');
		$(this).addClass('active');
		var oper = $(this).attr('name');
		$('#zcBodyWrapper').children('div').addClass('zc-hide')
		$('#' + oper + 'Div').removeClass('zc-hide');
		$('#' + oper + 'Div').find('input:first').focus();
	});

	function showResponse(response){
		$("#responseDiv").removeClass('zc-hide');
		$("#responseDiv").find("#responseCode").jsonViewer(response);
	}


	var creatorSdkPromise = ZOHO.CREATOR.init();
	creatorSdkPromise.then(function(data) {
		var recordOps = ZOHO.CREATOR.API;
		$('#addRecord').click(function() {
			console.log("Record Adding...");
			var formLinkName = $('#addRecordDiv').find('input[name=formLinkName]').val();
			var formData = JSON.parse($('#addRecordDiv').find('textarea[name=addRecBody]').val());

			var config = {
				formName : formLinkName,
				data : formData
			}
			console.log("Config: ");
			console.log(config);

			var addRecord = recordOps.addRecord(config);
			addRecord.then(function(jsonData) {
				console.log("Response: ");
				console.log(jsonData);

				$('#addRecordDiv').addClass('zc-hide');
				showResponse(jsonData);
			}).catch(function(data) {
				console.log(data);
			});
		});
		$('#editRecord').click(function() {
			console.log("Record Updating...");
			var reportLinkName = $('#editRecordDiv').find('input[name=reportLinkName]').val();
			var recordId = $('#editRecordDiv').find('input[name=recordId]').val();
			var formData = JSON.parse($('#editRecordDiv').find('textarea[name=editRecBody]').val());
			var config = {
				reportName : reportLinkName,
				id : recordId,
				data : formData
			}
			console.log("Config: ");
			console.log(config);
			
			var editRecord = recordOps.updateRecord(config);
			editRecord.then(function(jsonData) {
				console.log("Response: ");
				console.log(jsonData);

				$('#editRecordDiv').addClass('zc-hide');
				showResponse(jsonData);
			}).catch(function(data) {
				console.log(data);
			});
		});
		$('#deleteRecord').click(function() {
			console.log("Record Deleting...");
			var reportLinkName = $('#deleteRecordDiv').find('input[name=reportLinkName]').val();
			var criteria = $('#deleteRecordDiv').find('input[name=deleteCriteria]').val();

			var config = {
				reportName : reportLinkName,
				criteria : criteria
			}
			console.log("Config: ");
			console.log(config);

			var deleteRecord = recordOps.deleteRecord(config);
			deleteRecord.then(function(jsonData) {
				console.log("Response: ");
				console.log(jsonData);

				$('#deleteRecordDiv').addClass('zc-hide');
				showResponse(jsonData);
			}).catch(function(data) {
				console.log(data);
			});
		});
		$('#viewRecords').click(function() {
			console.log("Fetching all records...");
			var reportLinkName = $('#viewRecordsDiv').find('input[name=reportLinkName]').val();
			var criteria = $('#viewRecordsDiv').find('input[name=getCriteria]').val();
			var pageNumber = $('#viewRecordsDiv').find('input[name=pageNumber]').val();
			var pageSize = $('#viewRecordsDiv').find('input[name=pageSize]').val();

			var config = {
				reportName : reportLinkName
			}
			if(!$.isEmptyObject(criteria)){
				config["criteria"] = criteria;
			}
			if(!$.isEmptyObject(pageNumber)){
				config["page"] = pageNumber;
			}
			if(!$.isEmptyObject(pageSize)){
				config["pageSize"] = pageSize;
			}
			console.log("Config: ");
			console.log(config);

			var getRecords = recordOps.getAllRecords(config);
			getRecords.then(function(jsonData) {
				console.log("Response: ");
				console.log(jsonData);

				$('#viewRecordsDiv').addClass('zc-hide');
				showResponse(jsonData);
				$.each(jsonData.data, function(idx, value) {
					console.log(value);
				});
			});
		});
		$('#viewRecord').click(function() {
			console.log("Fetching a specific record...");
			var reportLinkName = $('#viewRecordDiv').find('input[name=reportLinkName]').val();
			var recordId = $('#viewRecordDiv').find('input[name=recordId]').val();

			var config = {
				reportName : reportLinkName,
				id : recordId
			}
			console.log("Config: ");
			console.log(config);

			var getRecord = recordOps.getRecordById(config);
			getRecord.then(function(jsonData) {
				console.log("Response: ");
				console.log(jsonData);

				$('#viewRecordDiv').addClass('zc-hide');
				showResponse(jsonData);
				$.each(jsonData.data, function(idx, value) {
					console.log(value);
				});
			});
		});
		$('#uploadFile').click(function() {
			console.log("Uploading file...");
			var reportLinkName = $('#uploadFileDiv').find('input[name=reportLinkName]').val();
			var fieldName = $('#uploadFileDiv').find('input[name=fieldName]').val();
			var recordId = $('#uploadFileDiv').find('input[name=recordId]').val();
			var parentId = $('#uploadFileDiv').find('input[name=parentId]').val();
			var fileEle = $('#uploadFileDiv').find('input[name=file]')[0]
			

			var config = {
				reportName : reportLinkName,
				id : recordId,
				fieldName : fieldName
			}

			if(fileEle.files.length > 0){
				config["file"] = fileEle.files[0];
			}

			if(!$.isEmptyObject(parentId)){
				config["parentId"] = parentId;
			}
			console.log("Config: ");
			console.log(config);

			var getRecords = recordOps.uploadFile(config);
			getRecords.then(function(jsonData) {
				console.log("Response: ");
				console.log(jsonData);

				$('#uploadFileDiv').addClass('zc-hide');
				showResponse(jsonData);
				$.each(jsonData.data, function(idx, value) {
					console.log(value);
				});
			});
		});

		$('#downloadImage').click(function() {
			console.log("Downloading Image...");
			var imageURL = $('#downloadImageDiv').find('input[name=imageURL]').val();
			var imageTagID = $('#downloadImageDiv').find('input[name=imageTagID]').val();

			var imageTag = document.getElementById(imageTagID);
			ZOHO.CREATOR.UTIL.setImageData(imageTag, imageURL);
		});
	}).catch(function(data) {
				console.log(data);
			});
});
