import loginAdminImg from "assets/img/admin_img.jpg";
import iconImg from "assets/img/logo_header.png";
import sideBarImg from "assets/img/sidebar-3.jpg";

let tokenAleatorio = Math.random().toString(36);

var params = [];
params["baseUrl"] = "http://dreamhouse.proyectospalomeque.es:3000/";
params["apiUrl"] = "http://api.dreamhouse.proyectospalomeque.es/api";
params["urlImagenes"] = "http://api.dreamhouse.proyectospalomeque.es/storage";
params["urlBackend"] = "http://api.dreamhouse.proyectospalomeque.es:8000";
params["loginAdminImg"] = loginAdminImg;
params["sideBarIcon"] = iconImg;
params["sideBarImg"] = sideBarImg;
params["sideBarColor"] = "#52bfc4";
params["firstColorRGB"] = "0, 176, 213";
params["firstColor"] = "#52bfc4";
params["firstColorHover"] = "#a8dfe1";
params["secondColor"] = "#bc2f7b";
params["color_green"] = "#3db194";
params["color_green_light"] = "#b9e5e7";
params["color_red"] = "#e43b96";
params["color_purple"] = "#942bac";
params["color_alert"] = "#df073f";
params["color_grey"] = "#556269";
params["color_grey2"] = "#494541";
params["color_grey_light"] = "#f5f5f5";
params["color_yellow"] = "#f9d03f";
params["color_yellow2"] = "#c7a632";
params["color_white"] = "#ffffff";
params["proyectName"] = "DREAM HOUSE";
params["defaultTableLength"] = 10;
params["tableLengthArray"] = [10, 25, 50];
params["personalizacion"] = false;
params["dev_mode"] = true;
params["panel_url"] = "administrador";
params["web_url"] = "entidad";

export default params;
