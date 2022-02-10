import { Component } from '@angular/core';
import { SelfieCameraTypes, UnicoCheckBuilder, UnicoThemeBuilder  } from 'unico-webframe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular12';

  ngOnInit() {
    function getHostUrlBase(path: string) {
      return window.location.protocol + "//" + window.location.host + "/" + path;
    }

    const urlPathModels = getHostUrlBase("assets/models")

    var callback = {
      on: {
        success: function (obj: any) {
          let blob = new Blob([JSON.stringify(obj)], {type:'application/json'});
          downloadURI(URL.createObjectURL(blob), "teste.json");
          window.alert(`capturado com sucesso`);
        },
        error: function (error: { code: any; message: any; stack: any; }) {
          window.console.log(error);
          window.alert(`
            Câmera fechada
            ------------------------------------
            Motivo: ${error.code} - ${error.message} ${JSON.stringify(error.stack)}
          `);
        },
        support: function (error: any) {
          console.log(error);
          window.alert(`
            Browser não suportado
            ------------------------------------
            iOS: Safari
            Android/Windows: Chrome, Firefox
          `);
        }
      }
    };

    function downloadURI(uri: string, name: string) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    let unicoTheme = new UnicoThemeBuilder()
      .setColorSilhouetteSuccess("#0384fc")
      .setColorSilhouetteError("#D50000")
      .setColorSilhouetteNeutral("#fcfcfc")
      .setBackgroundColor("#dff1f5")
      .setColorText("#0384fc")
      .setBackgroundColorComponents("#0384fc")
      .setColorTextComponents("#dff1f5")
      .setBackgroundColorButtons("#0384fc")
      .setColorTextButtons("#dff1f5")
      .setBackgroundColorBoxMessage("#fff")
      .setColorTextBoxMessage("#000")
      .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregandooooo...</div>`)
      .build();

    let unicoCamera = new UnicoCheckBuilder()
      .setTheme(unicoTheme)
      .setModelsPath(urlPathModels)
      .setResourceDirectory("/assets/resources")
      .build();

      unicoCamera
        .prepareSelfieCamera("/assets/services.json", SelfieCameraTypes.SMART)
        .then((documentCameraOpener: { open: (arg0: { on: { success: (obj: any) => void; error: (error: { code: any; message: any; stack: any; }) => void; support: (error: any) => void; }; }) => void; }) => {
          documentCameraOpener.open(callback);
        });
  }
}
