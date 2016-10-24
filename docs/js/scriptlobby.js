
var app = angular.module('App',['ngCookies','ngRoute','ngSanitize']);
//const URL = 'http://192.168.0.15:17476/ProductRESTService.svc/';
const URL = 'http://cewebserver.tyhmn8q9pa.us-west-2.elasticbeanstalk.com/ProductRESTService.svc/';
var NombreSeleccionado;
var projectos;
var etapas = 1;
app.config(function($routeProvider,$httpProvider) {

        $routeProvider
            .when('/editar', {
                templateUrl: 'editarUsuario.html',
                controller: 'proyectoController'
            })
            .when('/editarE', {
            templateUrl: 'EditarEmpleado.html',//aqui va el link del que quiero ver OJOJOJOJOJOJO
            controller: 'proyectoController'
            })

            .when('/proyectos', {
                templateUrl: 'proyectosCliente.html',//aqui va el link del que quiero ver OJOJOJOJOJOJO
                controller: 'proyectoController'
            })
            .when('/proyectosE', {
                templateUrl: 'proyectosEmpleado.html',//aqui va el link del que quiero ver OJOJOJOJOJOJO
                controller: 'proyectoController'
            })

            .when('/about', {
                templateUrl: 'pages/about.html',
                controller: 'AboutController'
            })
            .otherwise({redirectTo: '/'});


});

app.controller('getNames',function ($scope,$http,$cookies,$timeout) {

    $scope.names = [];
    $scope.infonames = [];
    $scope.selectedNames = $scope.names[0];
    $scope.StageIDProject = projectos;




    $scope.getSucursales = function () {
        $http.get(URL + 'GetStagesNames').success(function (data, status, headers, config) {
            $scope.infonames = (JSON).parse(data.toString());
            console.log($scope.infonames);
            angular.forEach($scope.infonames, function (item) {
                $scope.names.push(item.name)
            });
            $scope.selectedNames = $scope.names[0];
            NombreSeleccionado = $scope.selectedNames;

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }

    $scope.getSucursales();

    $scope.createStage = function () {


        var parameter = JSON.stringify({
            ID_Project: $cookies.project,
            Stage_Name: $scope.selectedNames,
            Start_Date: $scope.StageDateI,
            End_Date: $scope.StageDateF,
            Details: $scope.StageDetails,
            Comments: $scope.StageComments
        });
        console.log(parameter);
        $scope.loginRol=[];
        $http.post(URL+'CreateStage',parameter).success(function (data, status, headers, config) {

            //$scope.ROL = (JSON).parse(data.toString());
            console.log(data);
            console.log(status);
            //$timeout($scope.toLobby(),2000);

        }).error(function (data, status, headers, config) {
            console.log("Error");
            console.log(data);
            console.log(status);
        });

    }




});

app.controller('proyectoController',function ($scope,$http) {
    $scope.message = "";

});

app.controller('cookieController',function ($scope,$cookies) {
    $scope.UsernameU = $cookies.username;
    $scope.idUser = $cookies.userid;
    $scope.nameUser = $cookies.name;
    $scope.lastfname = $cookies.lastname1;
    $scope.lastsname = $cookies.lastname2;
    $scope.phone = $cookies.phone;
    $scope.emailUser = $cookies.email;
    $scope.passwordUser = $cookies.password;
    $scope.eng_code = $cookies.eng_code;
    console.log($scope.eng_code);

});

app.controller('Main',function($scope,$http,$cookies) {

    $scope.totalPresu = 0;
    $scope.newStage="";

    $scope.addStage = function () {
        var parameter = JSON.stringify({
            Stage_Name:$scope.newStage
        });

        $http.post(URL+'AddStageName',parameter).success(function (data, status, headers) {
            console.log("Agregado")
            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });


    }

    $scope.getPresupuesto = function () {

        angular.forEach($scope.nmaterial, function (items) {
            console.log(items.quantity*items.price);
            $scope.totalPresu += (items.quantity*items.price);
        });


    }





    $scope.nmaterial = [];
    $scope.infoMaterial = [];
    $scope.selectedMaterial = $scope.nmaterial[0];
    $scope.purchaseItems = [];





    angular.forEach($scope.purchaseItems, function (items) {
        angular.forEach($scope.nmaterial, function (items2) {
            if(items.name == items2.name){
                items2.quantity = items.Quantity;

            }
        });

    });

    $scope.addItem = function (productname) {
        $scope.num = 0;
        var flag = true;

            angular.forEach($scope.nmaterial, function (item2) {
                if (productname == item2.name){
                    item2.quantity += 1;
                    flag = false;


                }else{
                    if(flag){
                        console.log($scope.nmaterial[0]);
                        angular.forEach($scope.purchaseItems, function (item) {
                            //console.log(item.name);
                            if(item.name == productname && $scope.num == 0 && item.Quantity == 0  ){
                                $scope.num =1;
                                item.Quantity +=1;
                                //console.log("{\"name\":\""+item.name+"\",\"quantity\":1"+",\"price\":"+item.price+",\"purchased\":"+false+",\"id_stage\":"+etapas+",\"id_product\":"+item.id_product+"}");

                                $scope.nmaterial.push((JSON).parse("{\"name\":\""+item.name+"\",\"quantity\":1"+",\"price\":"+item.price+",\"purchased\":"+false+",\"id_stage\":"+etapas+",\"id_product\":"+item.id_product+"}"))

                            }

                        });
                    }

                }


            });




        console.log($scope.nmaterial);



    }


    $scope.sendProducts = function () {

    console.log(JSON.stringify($scope.nmaterial));

        $http.post(URL+'AddProducttoStage',$scope.nmaterial).success(function (data, status, headers) {

            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });


    }

    $scope.Comprar = function () {

        var parameter = JSON.stringify({
            id_stage:etapas
        });

        $http.post(URL+'PostStageShop',parameter).success(function (data, status, headers) {
            console.log("COMPRA REALIZADA")
            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });


    }


    $scope.getMaterials =  function () {
        $scope.nmaterial = [];

        $http.get(URL+"/GetProductsFromStage?id="+etapas).success(function (data, status, headers, config) {
            $scope.nmaterial = [];
            console.log(data.toString());
            $scope.infoMaterial = (JSON).parse(data.toString());
            angular.forEach($scope.infoMaterial, function (item) {
                $scope.nmaterial.push(item);
                //console.log("**");
            });
            //console.log($scope.nmaterial);



        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    }



    $scope.products = [];
    $scope.infoproducts = [];
    $scope.selectedProduct = $scope.products[0];

    $scope.getProducts = function () {
        $http.get(URL + 'GetProducts').success(function (data, status, headers, config) {
            console.log(data);
            $scope.infoproducts = (JSON).parse(data.toString());
            console.log($scope.infoproducts);
            angular.forEach($scope.infoproducts, function (item) {
                $scope.products.push(item)
            });
            if($scope.purchaseItems.length == 0){
                angular.forEach($scope.products, function (item) {
                    $scope.purchaseItems.push("{\"name\":\""+item.name+"\",\"Quantity\":0"+",\"id_product\":"+item.id_product+",\"price\":\""+item.price+"\"}")
                });

                $scope.purchaseItems = (JSON).parse("["+$scope.purchaseItems.toString()+"]");
            }

            console.log($scope.purchaseItems);
            $scope.selectedProduct = $scope.products[0];

        }).error(function (data, status, headers, config) {
            console.log(data);
        });





    }


    $scope.idproject=1;
    $scope.rootFolders = 'bob@go.com';
    //$scope.projects = [ ]
    //$scope.stages = []

    $scope.loadEmail = function (user) {
        $scope.idproject = user.id;
    }


    $scope.nprojects = [];
    $scope.infoProject = [];
    $scope.selectedProject = $scope.nprojects[0];

    $scope.getProjects = function () {
        $scope.nprojects = [];
        console.log(URL+'GetProjectsFrom?status='+$cookies.eng_code+'&id='+$cookies.userid);
        $http.get(URL+'GetProjectsFrom?status='+$cookies.eng_code+'&id='+$cookies.userid).success(function (data, status, headers,config) {
            $scope.infoProject = (JSON).parse(data.toString());
            console.log($scope.infoProject);
            angular.forEach($scope.infoProject, function (item) {
                $scope.nprojects.push(item)
            });

            $scope.selectedProject = $scope.nprojects[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    }

    $scope.getProjects();

        $scope.nstages = [];
        $scope.info = [];
        $scope.selectedStage = $scope.nstages[0];

    $scope.getStages = function (project) {
        $cookies.project = project;
        projectos = project;
        console.log($cookies.project + "******");

        $scope.nstages = [];
        $http.get(URL+'GetStagesFromProject?params='+project).success(function (data, status, headers, config) {
            $scope.info = (JSON).parse(data.toString());
            console.log($scope.info);
            angular.forEach($scope.info, function (item) {
                $scope.nstages.push(item)
            });
            console.log($scope.nstages.toString());

            $scope.selectedStage = $scope.nstages[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
        $scope.stages = $scope.nstages;
    }



    $scope.ninfostages = [];
    $scope.infoStages = [];
    $scope.selectedinfoStage = $scope.ninfostages[0];

    $scope.getInfoStages = function (project,nameStage) {

        $scope.nameUniversalStage = nameStage;
        etapas = project;
        //console.log($scope.nmaterial);
        $scope.infoStages = [];
        $http.get(URL+'GetInfoFromStage?id='+project).success(function (data, status, headers, config) {
            $scope.infoStages = (JSON).parse(data.toString());
            console.log($scope.infoStages);
            angular.forEach($scope.info, function (item) {
                $scope.ninfostages.push(item)
            });
            console.log("////////////////");
            $scope.getMaterials();
            //console.log($scope.ninfostages.toString());

            $scope.selectedStage = $scope.nstages[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });


    }

    $scope.refreshDetails = function () {
        console.log($scope.infoStages[0].details);

        var parameter = JSON.stringify({
            ID_Stage: etapas,
            Details:$scope.infoStages[0].details
        });


        console.log(parameter);
        $http.post(URL+'PostStageDetails',parameter).success(function (data, status, headers) {

            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });

    }





    $scope.refreshComments = function () {
        //console.log($scope.infoStages[0].details);

        var parameter = JSON.stringify({
            ID_Project: etapas,
            Comments:$scope.infoStages[0].comments
        });


        console.log(parameter);
        $http.post(URL+'PostStageComments',parameter).success(function (data, status, headers) {

            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });

    }



});

app.controller('editController',function ($scope,$cookies, $http) {



    $scope.updateuser = function () {
        $scope.typeOP = "";
        if($scope.eng_code == 0){
            $scope.typeOP = 'UpdateCustomer';
            var parameter = JSON.stringify({
                ID_Customer:$scope.idUser,
                Name: $scope.nameUser,
                Lastname_1:$scope.lastfname,
                Lastname_2:$scope.lastsname,
                Phone: $scope.phone,
                Email: $scope.emailUser,
                Username: $scope.UsernameU,
                Password: $scope.passwordUser
            });
        }else{
            $scope.typeOP = 'UpdateEngineer';
            var parameter = JSON.stringify({
            ID_Customer:$scope.idUser,
            Name: $scope.nameUser,
            Lastname_1:$scope.lastfname,
            Lastname_2:$scope.lastsname,
            Phone: $scope.phone,
            Email: $scope.emailUser,
            Eng_code:$scope.eng_code,
            Username: $scope.UsernameU,
            Password: $scope.passwordUser
        });
        }

        console.log($scope.eng_code);
        console.log($scope.typeOP);

        $http.post(URL+$scope.typeOP,parameter).success(function (data, status, headers, config) {

            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });

    }


});

app.controller('addProject',function ($scope,$cookies,$http) {

    $scope.ProjectEngID = $cookies.userid;
    $scope.pName = $scope.ProjectName;
    $scope.pLocation = $scope.ProjectLocation;
    $scope.PClienteID = $scope.ProjectClienteID;
    $scope.Pcomments = $scope.ProjectComments;
    $scope.Pdetails = $scope.ProjectDetails;


    
    
    
    
    $scope.addNewProject = function () {

        var parameter = JSON.stringify({
            Name: $scope.ProjectName,
            Location:$scope.ProjectLocation,
            ID_Engineer:$scope.ProjectEngID,
            ID_Customer: $scope.ProjectClienteID,
            Comments: $scope.ProjectComments,
            Details:$scope.ProjectDetails
        });

        console.log(parameter);
        $http.post(URL+'PostProject',parameter).success(function (data, status, headers) {

            console.log("status " + status);
            console.log("config " + data);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });


    }



});

app.controller('getProducts',function ($scope,$http,$cookies,$timeout) {

    $scope.products = [];
    $scope.infoproducts = [];
    $scope.selectedProduct = $scope.names[0];

    $scope.getProducts = function () {
        $http.get(URL + 'GetProducts').success(function (data, status, headers, config) {
            $scope.infoproducts = (JSON).parse(data.toString());
            console.log($scope.infoproducts);
            angular.forEach($scope.infoproducts, function (item) {
                $scope.products.push(item.name)
            });
            $scope.selectedProduct = $scope.products[0];

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }








});