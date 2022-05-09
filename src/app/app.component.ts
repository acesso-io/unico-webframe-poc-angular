import { Component } from '@angular/core';

import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  MainView,
  UnicoThemeBuilder,
  SuccessPictureResponse,
  ErrorPictureResponse,
  SupportPictureResponse
} from "unico-webframe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poc-check-angular';

  unicoCamera: MainView;

  // Possible callbacks
  callback = {
    on: {
      success: function (obj: SuccessPictureResponse) {
        window.alert(JSON.stringify(obj));
      },
      error: function (error: ErrorPictureResponse) {
        window.console.log(error);
        window.alert(`
            Câmera fechada
            ------------------------------------
            Motivo: ${error.code} - ${error.message} ${JSON.stringify(error.stack)}
          `);
      },
      support: function (error: SupportPictureResponse) {
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

  ngOnInit() {
    // Searching full base url
    function getHostUrlBase(path: string) {
      return window.location.protocol + "//" + window.location.host + "/" + path;
    }

    // Get base url with models path
    const urlPathModels = getHostUrlBase("assets/models");

    // Customizing SDK Themes
    const unicoTheme = new UnicoThemeBuilder()
      .setColorSilhouetteSuccess("#0384fc")
      .setColorSilhouetteError("#D50000")
      .setColorSilhouetteNeutral("#fcfcfc")
      .setBackgroundColor("#fff")
      .setColorText("#0384fc")
      .setBackgroundColorComponents("#0384fc")
      .setColorTextComponents("#dff1f5")
      .setBackgroundColorButtons("#0384fc")
      .setColorTextButtons("#dff1f5")
      .setBackgroundColorBoxMessage("#fff")
      .setColorTextBoxMessage("#000")
      .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregandooooo...</div>`)
      .build();

    // Instantiating the SDK Builder
    const unicoCameraBuilder = new UnicoCheckBuilder();
    unicoCameraBuilder.setTheme(unicoTheme);
    unicoCameraBuilder.setModelsPath(urlPathModels);
    unicoCameraBuilder.setResourceDirectory("/assets/resources");

    this.unicoCamera = unicoCameraBuilder.build();
  }

  async openCamera() {
    // Prepare camera
    const { open } = await this.unicoCamera.prepareSelfieCamera(
      '/assets/services.json',
      SelfieCameraTypes.NORMAL
    );

    open(this.callback);
  }
}
