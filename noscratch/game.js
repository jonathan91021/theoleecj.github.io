var servers = {};

function StartGame() {
  document.getElementById("Start").style.display = "none";
}

function Start() {
  // Initialise
  engine = new BABYLON.Engine(document.getElementById("Canvas"), true);
  scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.workerCollisions = true;
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

  function Build() {
    //Create a FreeCamera
    camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 3, 6), scene);
    camera.inertia = 0.85;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.75, 2, 0.75);
    camera.checkCollisions = true;
    camera.attachControl(document.getElementById("Canvas"), true);

    camera.keysUp = [87];
    camera.keysDown = [83];
    camera.keysLeft = [65];
    camera.keysRight = [68];

    //TODO: Turn camera with arrow keys

    //Push in the lights!
    var ambient = new BABYLON.HemisphericLight("Atmospheric Light", new BABYLON.Vector3(0, 24, 0), scene);
    ambient.intensity = 1;
    
    //Floor
    var grassMaterial = new BABYLON.StandardMaterial("Frozen Grass Material", scene);
	  var grassTexture = new BABYLON.Texture("textures/wall.png", scene);
   	grassMaterial.diffuseTexture = grassTexture;
   	grassMaterial.diffuseTexture.uScale = 21.0;
   	grassMaterial.diffuseTexture.vScale = 21.0;
   	
    var ground = BABYLON.MeshBuilder.CreateGround("Ground", {width: 42, height: 42, subdivsions: 36}, scene);
    ground.position.y = 0;
    ground.material = grassMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;

    //"Scratch Datacenter"
    var sign = {
      mesh: [],
      material: new BABYLON.StandardMaterial("Datacenter Wall Sign", scene), texture: new BABYLON.Texture("textures/scratch-logo.png", scene)
    };

    sign.material.diffuseTexture = sign.texture;

    sign.mesh = BABYLON.MeshBuilder.CreateBox("Concrete Wall 1", {width: 12, height: 4, depth: 0.5}, scene);
    sign.mesh.position.x = 0; sign.mesh.position.y = 10.5; sign.mesh.position.z = 20;
    sign.mesh.material = sign.material;
    sign.mesh.checkCollisions = true;

    //The Datacenter
    var datacenter = {
      walls: [],
      material: new BABYLON.StandardMaterial("Concrete Wall Material", scene), texture: new BABYLON.Texture("textures/wall.png", scene)
    };

   	datacenter.material.diffuseTexture = datacenter.texture;

    datacenter.walls[0] = BABYLON.MeshBuilder.CreateBox("Concrete Wall 1", {width: 42, height: 12, depth: 0.5}, scene);
    datacenter.walls[0].position.x = 0; datacenter.walls[0].position.y = 6; datacenter.walls[0].position.z = 21.25;
    datacenter.walls[0].material = datacenter.material;
    datacenter.walls[0].checkCollisions = true;

    datacenter.walls[1] = BABYLON.MeshBuilder.CreateBox("Concrete Wall 2", {width: 42, height: 12, depth: 0.5}, scene);
    datacenter.walls[1].position.x = 0; datacenter.walls[1].position.y = 6; datacenter.walls[1].position.z = -21.25;
    datacenter.walls[1].material = datacenter.material;
    datacenter.walls[1].checkCollisions = true;

    datacenter.walls[2] = BABYLON.MeshBuilder.CreateBox("Concrete Wall 3", {width: 0.5, height: 12, depth: 42}, scene);
    datacenter.walls[2].position.x = 21.25; datacenter.walls[2].position.y = 6; datacenter.walls[2].position.z = 0;
    datacenter.walls[2].material = datacenter.material;
    datacenter.walls[2].checkCollisions = true;

    datacenter.walls[3] = BABYLON.MeshBuilder.CreateBox("Concrete Wall 4", {width: 0.5, height: 12, depth: 42}, scene);
    datacenter.walls[3].position.x = -21.25; datacenter.walls[3].position.y = 6; datacenter.walls[3].position.z = 0;
    datacenter.walls[3].material = datacenter.material;
    datacenter.walls[3].checkCollisions = true;

    datacenter.walls[4] = BABYLON.MeshBuilder.CreateBox("Concrete Roof", {width: 45, height: 0.5, depth: 45}, scene);
    datacenter.walls[4].position.x = 0; datacenter.walls[4].position.y = 12.25; datacenter.walls[4].position.z = 0;
    datacenter.walls[4].material = datacenter.material;
    datacenter.walls[4].checkCollisions = true;

    BABYLON.Mesh.MergeMeshes(datacenter.walls);

    //Scratch Servers
    servers = {
      towers1: [], towers2: [], towers3: [], towers4: [],
      towersAsArray: [],
      haveParticlesBeenApplied: [false, false, false, false, false, false],
      towersHealthPoints: [],
      material: new BABYLON.StandardMaterial("Server Material", scene), texture: new BABYLON.Texture("textures/server.png", scene)
    };

   	servers.material.diffuseTexture = servers.texture;

    //Server Block 1
    var serversRendered = 0;

    while (serversRendered < 7) {
      servers.towers1[serversRendered] = BABYLON.MeshBuilder.CreateBox("Server Tower " + serversRendered, {width: 3, height: 6, depth: 3}, scene);
      servers.towers1[serversRendered].position.x = 19.5 - (3 * serversRendered); servers.towers1[serversRendered].position.y = 3; servers.towers1[serversRendered].position.z = 19.5;
      servers.towers1[serversRendered].material = servers.material;
      servers.towers1[serversRendered].checkCollisions = true;

      servers.towersHealthPoints["Server Tower 0_merged"] = 150;

      tooltipsService.bindTooltip("Server Tower 0_merged", "Scratch Server Tower (Cat) - click to punch<br>(Hit Points: 150)");
      clicksService.bindClick("Server Tower 0_merged", function() {
        servers.towersHealthPoints["Server Tower 0_merged"] = servers.towersHealthPoints["Server Tower 0_merged"] - 51;

        if (servers.towersHealthPoints["Server Tower 0_merged"] < 0 && servers.haveParticlesBeenApplied[0] == false) {
          tooltipsService.replaceTooltip("Server Tower 0_merged", "Scratch Server Tower (Cat) - click to punch<br>(Destroyed)");
          document.getElementById("MascotsLeft-Cat").setAttribute("src", "textures/cat-red.png");
          servers.haveParticlesBeenApplied[0] = true;

          //Smoke
          var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, scene);
          smokeSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
          smokeSystem.emitter = servers.towersAsArray[0]; // the starting object, the emitter
          smokeSystem.minEmitBox = new BABYLON.Vector3(21, 5, 21); // Starting all from
          smokeSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 16.75); // To...
          
          smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
          smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
          smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          
          smokeSystem.minSize = 0.3; smokeSystem.maxSize = 1;
          smokeSystem.minLifeTime = 0.3; smokeSystem.maxLifeTime = 1.5;
          smokeSystem.emitRate = 18000;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

          smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

          smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
          smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

          smokeSystem.minAngularSpeed = 0; smokeSystem.maxAngularSpeed = Math.PI;
          smokeSystem.minEmitPower = 0.5; smokeSystem.maxEmitPower = 1.5;
          smokeSystem.updateSpeed = 0.005;

          smokeSystem.start();
          
          // Create a particle system
          var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

          //Texture of each particle
          fireSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

          // Where the particles come from
          fireSystem.emitter = servers.towersAsArray[0]; // the starting object, the emitter
          fireSystem.minEmitBox = new BABYLON.Vector3(21, 5, 21); // Starting all from
          fireSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 16.75); // To...
          
          fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          
          fireSystem.minSize = 0.3; fireSystem.maxSize = 1; 
          fireSystem.minLifeTime = 0.2; fireSystem.maxLifeTime = 0.4; 
          fireSystem.emitRate = 24000;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          
          fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

          fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
          fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

          fireSystem.minAngularSpeed = 0; fireSystem.maxAngularSpeed = Math.PI;
          fireSystem.minEmitPower = 1; fireSystem.maxEmitPower = 3;
          fireSystem.updateSpeed = 0.007;

          // Start the particle system
          fireSystem.start();
        }
      });

      servers.towersAsArray[0] = BABYLON.Mesh.MergeMeshes(servers.towers1);

      serversRendered++;
    }

    //Server Block 2
    serversRendered = 0;

    while (serversRendered < 6) {
      servers.towers2[serversRendered] = BABYLON.MeshBuilder.CreateBox("Server Tower " + (serversRendered + 7), {width: 3, height: 6, depth: 3}, scene);
      servers.towers2[serversRendered].position.x = 16.5 - (3 * serversRendered); servers.towers2[serversRendered].position.y = 3; servers.towers2[serversRendered].position.z = 13.5;
      servers.towers2[serversRendered].material = servers.material;
      servers.towers2[serversRendered].checkCollisions = true;
      servers.towers2[serversRendered].rotation.y = Math.PI;

      servers.towersHealthPoints["Server Tower 7_merged"] = 150;

      tooltipsService.bindTooltip("Server Tower 7_merged", "Scratch Server Tower (That Weird Blue Alien) - click to punch<br>(Hit Points: 150)");
      clicksService.bindClick("Server Tower 7_merged", function() {
        servers.towersHealthPoints["Server Tower 7_merged"] = servers.towersHealthPoints["Server Tower 7_merged"] - 51;

        if (servers.towersHealthPoints["Server Tower 7_merged"] < 0 && servers.haveParticlesBeenApplied[1] == false) {
          tooltipsService.replaceTooltip("Server Tower 7_merged", "Scratch Server Tower (That Weird Blue Alien) - click to punch<br>(Destroyed)");
          document.getElementById("MascotsLeft-Tera").setAttribute("src", "textures/tera-red.png");
          servers.haveParticlesBeenApplied[1] = true;

          //Smoke
          var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, scene);
          smokeSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
          smokeSystem.emitter = servers.towersAsArray[0]; // the starting object, the emitter
          smokeSystem.minEmitBox = new BABYLON.Vector3(18, 5, 15.25); // Starting all from
          smokeSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 11.75); // To...
          
          smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
          smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
          smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          
          smokeSystem.minSize = 0.3; smokeSystem.maxSize = 1;
          smokeSystem.minLifeTime = 0.3; smokeSystem.maxLifeTime = 1.5;
          smokeSystem.emitRate = 18000;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

          smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

          smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
          smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

          smokeSystem.minAngularSpeed = 0; smokeSystem.maxAngularSpeed = Math.PI;
          smokeSystem.minEmitPower = 0.5; smokeSystem.maxEmitPower = 1.5;
          smokeSystem.updateSpeed = 0.005;

          smokeSystem.start();
          
          // Create a particle system
          var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

          //Texture of each particle
          fireSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

          // Where the particles come from
          fireSystem.emitter = servers.towersAsArray[0]; // the starting object, the emitter
          fireSystem.minEmitBox = new BABYLON.Vector3(18, 5, 15.25); // Starting all from
          fireSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 11.75); // To...
          
          fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          
          fireSystem.minSize = 0.3; fireSystem.maxSize = 1; 
          fireSystem.minLifeTime = 0.2; fireSystem.maxLifeTime = 0.4; 
          fireSystem.emitRate = 24000;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          
          fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

          fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
          fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

          fireSystem.minAngularSpeed = 0; fireSystem.maxAngularSpeed = Math.PI;
          fireSystem.minEmitPower = 1; fireSystem.maxEmitPower = 3;
          fireSystem.updateSpeed = 0.007;

          // Start the particle system
          fireSystem.start();
        }
      });

      servers.towersAsArray[1] = BABYLON.Mesh.MergeMeshes(servers.towers2);

      serversRendered++;
    }

    //Server Block 3
    serversRendered = 0;

    while (serversRendered < 6) {
      servers.towers3[serversRendered] = BABYLON.MeshBuilder.CreateBox("Server Tower " + (serversRendered + 15), {width: 3, height: 6, depth: 3}, scene);
      servers.towers3[serversRendered].position.x = 16.5 - (3 * serversRendered); servers.towers3[serversRendered].position.y = 3; servers.towers3[serversRendered].position.z = 10.5;
      servers.towers3[serversRendered].material = servers.material;
      servers.towers3[serversRendered].checkCollisions = true;

      servers.towersHealthPoints["Server Tower 15_merged"] = 150;

      tooltipsService.bindTooltip("Server Tower 15_merged", "Scratch Server Tower (That Weird Orange Alien) - click to punch<br>(Hit Points: 150)");
      clicksService.bindClick("Server Tower 15_merged", function() {
        servers.towersHealthPoints["Server Tower 15_merged"] = servers.towersHealthPoints["Server Tower 15_merged"] - 51;

        if (servers.towersHealthPoints["Server Tower 15_merged"] < 0 && servers.haveParticlesBeenApplied[2] == false) {
          tooltipsService.replaceTooltip("Server Tower 15_merged", "Scratch Server Tower (That Weird Orange Alien) - click to punch<br>(Destroyed)");
          document.getElementById("MascotsLeft-Gobo").setAttribute("src", "textures/gobo-red.png");
          servers.haveParticlesBeenApplied[2] = true;

          //Smoke
          var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, scene);
          smokeSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
          smokeSystem.emitter = servers.towersAsArray[0]; // the starting object, the emitter
          smokeSystem.minEmitBox = new BABYLON.Vector3(18, 5, 12.25); // Starting all from
          smokeSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 8.75); // To...
          
          smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
          smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
          smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          
          smokeSystem.minSize = 0.3; smokeSystem.maxSize = 1;
          smokeSystem.minLifeTime = 0.3; smokeSystem.maxLifeTime = 1.5;
          smokeSystem.emitRate = 18000;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

          smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

          smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
          smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

          smokeSystem.minAngularSpeed = 0; smokeSystem.maxAngularSpeed = Math.PI;
          smokeSystem.minEmitPower = 0.5; smokeSystem.maxEmitPower = 1.5;
          smokeSystem.updateSpeed = 0.005;

          smokeSystem.start();
          
          // Create a particle system
          var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

          //Texture of each particle
          fireSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

          // Where the particles come from
          fireSystem.emitter = servers.towersAsArray[0]; // the starting object, the emitter
          fireSystem.minEmitBox = new BABYLON.Vector3(18, 5, 12.25); // Starting all from
          fireSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 8.75); // To...
          
          fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          
          fireSystem.minSize = 0.3; fireSystem.maxSize = 1; 
          fireSystem.minLifeTime = 0.2; fireSystem.maxLifeTime = 0.4; 
          fireSystem.emitRate = 24000;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          
          fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

          fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
          fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

          fireSystem.minAngularSpeed = 0; fireSystem.maxAngularSpeed = Math.PI;
          fireSystem.minEmitPower = 1; fireSystem.maxEmitPower = 3;
          fireSystem.updateSpeed = 0.007;

          // Start the particle system
          fireSystem.start();
        }
      });

      servers.towersAsArray[2] = BABYLON.Mesh.MergeMeshes(servers.towers3);

      serversRendered++;
    }

    //Return the created scene
    return scene;
  }

  scene = Build();

  engine.runRenderLoop(function() {
    scene.render();
  });
}

function ResizeCanvas() {
  engine.resize();
}