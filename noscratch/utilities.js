var tooltips = [];
var tasks = [];
var clicks = [];

//Tooltips
class tooltipsService {
  static checkTooltips(event, meshInfo) {
    var checked = 0;
    
    while (checked < tooltips.length) {
      if (meshInfo.pickedMesh.name == tooltips[checked].meshName) {
        var tooltip = document.getElementById("Tooltip");
        tooltip.style.left = (event.clientX + 20) + "px";
        tooltip.style.top = (event.clientY + 20) + "px";
        tooltip.innerHTML = tooltips[checked].tooltipContent;
        tooltip.style.display = "block";
        
        checked = tooltips.length;
      }
      else {
        var tooltip = document.getElementById("Tooltip");
        tooltip.style.display = "none";
      }
      
      checked++;
    }
  }
  
  static bindTooltip(meshName, tooltipContent) {
    tooltips[tooltips.length] = {
      meshName: meshName,
      tooltipContent: tooltipContent
    };
  }

  static replaceTooltip(meshName, tooltipContent) {
    var checked = 0;
    
    while (checked < tooltips.length) {
      if (meshName == tooltips[checked].meshName) {
        tooltips[checked] = {
          meshName: meshName,
          tooltipContent: tooltipContent
        };
      }
      
      checked++;
    }
  }
}

//Tasks
class tasksService {
  static checkTasks(taskId) {
    document.getElementById("ToDo").innerHTML = tasks[taskId].taskText;
  }
  
  static bindTask(meshName, task) {
    tasks[tasks.length] = {
      meshName: meshName,
      taskText: task
    };
  }
}

//Clicks
class clicksService {
  static checkClicks(event, meshInfo) {
    var checked = 0;
    
    while (checked < clicks.length) {
      if (meshInfo.pickedMesh.name == clicks[checked].meshName) { clicks[checked].functionToRun(); }
      else { /*Nothing*/ }
      
      checked++;
    }
  }
  
  static bindClick(meshName, functionToExecute) {
    clicks[clicks.length] = {
      meshName: meshName,
      functionToRun: functionToExecute
    };
  }
}

//Dialogue
function PushDialogue(dialogue) {
  document.getElementById("Speech").innerHTML = dialogue;
}

//Save Game
class game {
  
}