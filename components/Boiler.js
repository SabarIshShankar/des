import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter
} from "react-native";

import { createIconSet } from "react-native-vector-icons";
import Button from "react-native-button";
import VoxImplant from "react-native-voximplant";

var update = require("react-addons-update");

import ColorSwitch from "./ColorSwitch";
import ToggleButton from "./ToggleButton";
import { Keypad } from "./Keypad";

var glyphMap = {
  speaker: "\uE600",
  "mic-mute": "\uE601",
  keypad: "\uE602",
  "snd-mute": "\uE603",
  phone: "\uE604",
  hangup: "\uE605",
  "flip-camera": "\uE606"
};

if (Platform.OS == "ios") {
  var Icon = createIconSet(glyphMap, "icomoon");
} else {
  Icon = createIconSet(glyphMap, "Custom");
}
var currentCallId,
  uaInstance,
  number = "",
  settings_p2p = false,
  settings_video = false,
  micMutes = false,
  loudSpeaker = false,
  sendVideo = true,
  camera = "front";

DeviceEventEmitter.addListener("Callinging", (callId) => {
  console.log("Call ringing");
});

DeviceEventEmitter.addListener("CallConnected", (callId) => {
  console.log("Call connected");
  uaInstance.callConncted(callId);
});

DeviceEventEmitter.addListener("CallFailed", (callId, code, reason) => {
  console.log("Call failed. Code" + code + "Reason" + reason);
  uaInstance.setModalText("Call failed", "idle");
});

DeviceEventEmitter.addListener("CallDisconnected", (callId) => {
  console.log("Call disconnected");
  uaInstance.callDisconnected(callId);
});

DeviceEventEmitter.addListener("IncomingCall", (incomingCall) => {
  console.log("Inbound Call");
  currentCallId = incomingCall.callId;
  uaInstance.setModalText(
    "Inbound call from" + incomingCall.from,
    "inboundcall"
  );
});

export default class Boiler extends Component {
  constructor() {
    super();
    this.state = {
      modalText: "",
      isModalOpen: false,
      status: "idle"
    };
    VoxImplant.SDK.switchToCamera(camera);
  }

  componentDidMount() {
    uaInstance = this;
    this._thisNumber.focus();
  }

  updateNumber(text) {
    number = text;
    this._thisNumber.setNativeProps({ text: text });
  }
  onSubmit(event) {
    this.makeCall();
  }
  makeCall(event) {
    console.log("calling" + number);
    VoxImplant.SDK.createCall(
      number,
      settings_video,
      null,
      function (callId) {
        if (settings_p2p)
          VoxImplant.SDK.startCall(callId, { "X-DirectCall": "true" });
        else VoxImplant.SDK.startCall(callId);
        this.setState(
          update(this.state, {
            $merge: {
              status: "calling"
            }
          })
        );
      }.bind(this)
    );
  }
}
