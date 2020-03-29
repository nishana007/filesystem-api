// get the fs object based on Browser being used
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

// Get the page elements to work with
var maxFileSizeQuota = 1024 * 1024 * 5;
var form = document.getElementById('form1');
var fileContents = document.getElementById('filecontents'); 
var fileNameTextBox = document.getElementById('txtFileName');
var contentTextArea = document.getElementById('txtFileContent');


// global variable to store the fs object
var fs = null;

// initialize the file System
function initFileSystem() {
    navigator.webkitPersistentStorage.requestQuota(maxFileSizeQuota, function (grantedSize) {
        window.requestFileSystem(window.PERSISTENT, grantedSize, function (fileSystem) {
            fs = fileSystem;

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                 loadTheFile(fileNameTextBox.value);
            });

           

        }, handleError);
    }, handleError);
}

function loadTheFile(filename) {
    
    fs.root.getFile(filename, {}, function (fileEntry) {

        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                // Update the form fields.
                fileNameTextBox.value = filename;
                fileContents.innerText = this.result; 
            };

            reader.readAsText(file);
        }, handleError);

    }, handleError);
}

if (window.requestFileSystem) {
    initFileSystem();
} else {
    alert('Sorry! Your browser doesn\'t support the FileSystem API :(');
}

// Generic Error handler used in the FileSyste that is found on the web
function handleError(error) {
    var message = '';

    switch (error.code) {
        case FileError.SECURITY_ERR:
            message = 'Security Error occured';
            break;
        case FileError.NOT_FOUND_ERR:
            message = 'File Not Found';
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            message = 'Quota limit Exceeded';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            message = "Can''t modify";
            break;
        case FileError.INVALID_STATE_ERR:
            message = 'Invalid State';
            break;
        default:
            message = 'Do not know, what happened. Report to webmaster';
            break;
    }
    alert(message);
}

