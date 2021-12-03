import { Component } from '@angular/core';
import * as acessoWebFrame from 'unico-webframe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unico-webframe-poc-angular';

  ngOnInit(){

    function getHostUrlBase(path) {
      return window.location.protocol + "//" + window.location.host + "/" + path;
    }
    
    document.addEventListener("DOMContentLoaded", () => {
    
      var urlPathModels = getHostUrlBase("/assets/models");
    
      var callback = {
        on: {
          success: function(obj) {
            console.log(obj);
          },
          error: function(err) {
            console.error(err)
          },
          support: function(err) {
            console.log(err)
          }
        }
      };
    
      var layout = {
        silhouette: {
          primaryColor: "#0bbd26",
          secondaryColor: "#bd0b0b",
          neutralColor: "#fff",
        },
        buttonCapture: {
          backgroundColor: "#2980ff",
          iconColor: "#fff",
        },
        popupLoadingHtml: `<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Loading...</div>`,
        boxMessage: {
          backgroundColor: "#2980ff",
          fontColor: "#fff"
        },
        boxDocument: {
          backgroundColor: "#2980ff",
          fontColor: "#fff"    
        }
      }
    
      let configurations = {
        TYPE: 1,
        optional: {
          FACE_MODE: 1,
          LABEL_DOCUMENT_TYPE_OTHERS: "doc",
        }
      }

      //Câmera normal
      //Type = 1 (Confira os tipos em nossa documentação)
      //Não necessita carregar modelos
      //configurations.TYPE = 1;
      //acessoWebFrame.initCamera(configurations, callback, layout);
    
      //Camera inteligente
      //Type = 2 (Confira os tipos em nossa documentação)
      configurations.TYPE = 2;
      acessoWebFrame.webFrameModel
      .loadModelsCameraInteligence(urlPathModels)
      .then(() => {
        acessoWebFrame.initCamera(configurations, callback, layout);
      })
      .catch((e) => {
        console.error(e);
      });
    
      //Document
      //(Confira os tipos em nossa documentação)
      //acessoWebFrame.initDocument(configurations, callback, layout);
    });
  }

}
