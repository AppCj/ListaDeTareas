var taskListApp = angular.module("taskListApp", []);

taskListApp.controller("taskListCtrl", function ($scope) {
    $scope.usuario = "Carlos";
    $scope.btnDone = "All Done";
    $scope.editIndex = -1;
    $scope.valorTask = "";
    $scope.ckDone = false;
    $scope.msgError = "";

    $scope.lista = [
        { descripcion: "Hacer pantalla de producto", done: true },
        { descripcion: "Hacer pantalla de cliente", done: true },
        { descripcion: "Hacer pantalla de prestamos", done: false },
        { descripcion: "Hacer pantalla de tabla de amortizacion", done: false },
        { descripcion: "Hacer pantalla de desembolso", done: false },
    ];

    $scope.tareasIncompletas = function () {
        var count = 0;

        angular.forEach($scope.lista, function (task) {
            if (!task.done)
                count++;
        });

        return count;
    };

    $scope.getColor = function () {
        return $scope.tareasIncompletas() < 3 ? "label-success" : "label-danger";
    };

    $scope.agregarTarea = function (task) {

        if (task == "") {
            $scope.msgError = "Debe especificar el texto.";
            return;
        }

        $scope.msgError = "";

        if ($scope.editIndex == -1) {
            $scope.lista.push({ descripcion: task, done: false });
        }
        else {
            $scope.lista[$scope.editIndex].descripcion = task;
            $scope.editIndex = -1;
        }

        $scope.valorTask = "";
    };

    $scope.editarTarea = function (task) {
        var index = $scope.lista.indexOf(task);

        if (index > -1) {
            $scope.valorTask = $scope.lista[index].descripcion;
            $scope.editIndex = index;
        }
    };

    $scope.borrarTarea = function (task) {
        var index = $scope.lista.indexOf(task);

        if (index > -1) {
            $scope.lista.splice(index, 1);
            $scope.editIndex = -1;
        }
    };

    $scope.status = function () {

        var valor = false;

        if ($scope.btnDone == "All Done") {
            $scope.btnDone = "All UnDone"
            valor = true;
        } else {
            $scope.btnDone = "All Done"
            valor = false;
        }
        
        angular.forEach($scope.lista, function (task) {
            task.done = valor;
        });
    };

    $scope.status2 = function () {

        var valor = false;

        //if ($scope.ckDone == false) {
        //    //$scope.ckDone = true;
        //} else {
        //    //$scope.ckDone = false;
        //}

        angular.forEach($scope.lista, function (task) {
            task.done = $scope.ckDone;
        });
    };

});