/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
export const getAllMetrics = () => {
  let all = getRepMetrics();
  Array.prototype.push.apply(all, getEdgMetrics());
  Array.prototype.push.apply(all, getSigMetrics());
  Array.prototype.push.apply(all, getMaMetrics());
  Array.prototype.push.apply(all, getFunMetrics());
  return all;
}


export const getRepMetrics = () => {
  return [
    {
      "metric": "transaction_accessmanager_grants",
      "type": "rep",
      "feature": "access manager",
      "action": "grant permissions",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_apns_removed",
      "type": "rep",
      "feature": "push",
      "action": "unregister apns device on channel",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_fcm_removed",
      "type": "rep",
      "feature": "push",
      "action": "unregister fcm device on channel",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_publish",
      "type": "rep",
      "feature": "files",
      "action": "publish file url",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_internal_publish_objects",
      "type": "rep",
      "feature": "publish",
      "action": "object events",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_kv_write",
      "type": "rep",
      "feature": "functions",
      "action": "kv write",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_misfire_client",
      "type": "rep",
      "feature": "functions",
      "action": "client misfire",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_misfire_eh",
      "type": "rep",
      "feature": "funcitons",
      "action": "fuctions misfire",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_create_space",
      "type": "rep",
      "feature": "objects",
      "action": "create space",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_create_user",
      "type": "rep",
      "feature": "objects",
      "action": "create user",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_delete_space",
      "type": "rep",
      "feature": "objects",
      "action": "delete space",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_delete_user",
      "type": "rep",
      "feature": "objects",
      "action": "delete user",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_update_space",
      "type": "rep",
      "feature": "objects",
      "action": "update space",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_update_space_user_memberships",
      "type": "rep",
      "feature": "objects",
      "action": "update space members",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_update_user",
      "type": "rep",
      "feature": "objects",
      "action": "update user",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_update_user_space_memberships",
      "type": "rep",
      "feature": "objects",
      "action": "update user memberships",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_writes",
      "type": "rep",
      "feature": "objects",
      "action": "object writes",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_setuserstate",
      "type": "rep",
      "feature": "presence",
      "action": "set state",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_publish",
      "type": "rep",
      "feature": "publish",
      "action": "message",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_push_device_writes",
      "type": "rep",
      "feature": "push",
      "action": "register devices for channel",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_streamcontroller_writes",
      "type": "rep",
      "feature": "channel groups",
      "action": "add/remove channels",
      "label": "",
      "description": ""
    }
  ];
}

export const getEdgMetrics = () => {
  return [
    {
      "metric": "transaction_accessmanager_audits",
      "type": "edg",
      "feature": "access manager",
      "action": "audit permissions",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_accessmanager_clienterrors",
      "type": "edg",
      "feature": "access manager",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_apns_sent",
      "type": "edg",
      "feature": "push",
      "action": "apns sent",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_fcm_sent",
      "type": "edg",
      "feature": "push",
      "action": "fcm sent",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_clienterrors",
      "type": "edg",
      "feature": "files",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_delete_file",
      "type": "edg",
      "feature": "files",
      "action": "delet file",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_generate_url",
      "type": "edg",
      "feature": "files",
      "action": "generate file url",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_get_all_files",
      "type": "edg",
      "feature": "files",
      "action": "get all files",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_get_file",
      "type": "edg",
      "feature": "files",
      "action": "get file",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_files_unauthorized",
      "type": "edg",
      "feature": "files",
      "action": "unauthorized",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_history",
      "type": "edg",
      "feature": "history",
      "action": "fetch messages",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_history_clienterrors",
      "type": "edg",
      "feature": "history",
      "action": "client errors",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_history_messages_count",
      "type": "edg",
      "feature": "history counts",
      "action": "message count",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_history_with_actions",
      "type": "edg",
      "feature": "history with actions",
      "action": "fetch messages with actions",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_history_with_actions_clienterrors",
      "type": "edg",
      "feature": "history with actions",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_history_with_actions_unauthorized",
      "type": "edg",
      "feature": "history with actions",
      "action": "unauthorized",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_kv_read",
      "type": "edg",
      "feature": "functions",
      "action": "kv read",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_message_actions_clienterrors",
      "type": "edg",
      "feature": "message actions",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_message_actions_get",
      "type": "edg",
      "feature": "message actions",
      "action": "get message actions",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_clienterrors",
      "type": "edg",
      "feature": "objects",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_get_all_spaces",
      "type": "edg",
      "feature": "objects",
      "action": "get all spaces",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_get_all_users",
      "type": "edg",
      "feature": "objects",
      "action": "get all users",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_get_space",
      "type": "edg",
      "feature": "objects",
      "action": "get space",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_get_space_user_memberships",
      "type": "edg",
      "feature": "objects",
      "action": "get space members",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_get_user",
      "type": "edg",
      "feature": "objects",
      "action": "get user",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_get_user_space_memberships",
      "type": "edg",
      "feature": "objects",
      "action": "get user memberships",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_reads",
      "type": "edg",
      "feature": "objects",
      "action": "object reads",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_objects_unauthorized",
      "type": "edg",
      "feature": "objects",
      "action": "unauthorized",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_clienterrors",
      "type": "edg",
      "feature": "presence",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_getuserstate",
      "type": "edg",
      "feature": "presence",
      "action": "get state",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_heartbeats",
      "type": "edg",
      "feature": "presence",
      "action": "explicit heartbeats",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_herenow",
      "type": "edg",
      "feature": "presence",
      "action": "here now",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_herenow_global",
      "type": "edg",
      "feature": "presence",
      "action": "global here now",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_leave",
      "type": "edg",
      "feature": "presence",
      "action": "client leave",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_presence_wherenow",
      "type": "edg",
      "feature": "presence",
      "action": "where now",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_publish_clienterrors",
      "type": "edg",
      "feature": "publish",
      "action": "client errors",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_publish_unauthorized",
      "type": "edg",
      "feature": "publish",
      "action": "unauthorized",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_push_device_clienterrors",
      "type": "edg",
      "feature": "push",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_push_device_reads",
      "type": "edg",
      "feature": "push",
      "action": "list devices for channel",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_streamcontroller_clienterrors",
      "type": "edg",
      "feature": "channel groups",
      "action": "client errors",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_streamcontroller_reads",
      "type": "edg",
      "feature": "channel groups",
      "action": "list channels",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe",
      "type": "edg",
      "feature": "subscribe",
      "action": "receive message",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_clientclosedconnection",
      "type": "edg",
      "feature": "subscribe",
      "action": "client disconnect",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_clienterrors",
      "type": "edg",
      "feature": "subscribe",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_files",
      "type": "edg",
      "feature": "subscribe",
      "action": "receive file url",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_heartbeats",
      "type": "edg",
      "feature": "subscribe",
      "action": "init",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_objects",
      "type": "edg",
      "feature": "subscribe",
      "action": "recieve object event",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_streaming",
      "type": "edg",
      "feature": "subscribe",
      "action": "streaming",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_timeouts",
      "type": "edg",
      "feature": "subscribe",
      "action": "long poll expire",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_unauthorized",
      "type": "edg",
      "feature": "subscribe",
      "action": "unauthorized",
      "label": "",
      "description": ""
    }
  ];
}

export const getSigMetrics = () => {
  return [
    {
      "metric": "transaction_signal",
      "type": "sig",
      "feature": "signal",
      "action": "signal",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_signal_clienterrors",
      "type": "sig",
      "feature": "signal",
      "action": "client error",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_signal_unauthorized",
      "type": "sig",
      "feature": "signal",
      "action": "unauthorized",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_subscribe_signal",
      "type": "sig",
      "feature": "subscribe",
      "action": "receive signal",
      "label": "",
      "description": ""
    }
  ];
}

export const getMaMetrics = () => {
  return [
    {
      "metric": "transaction_message_actions_add",
      "type": "ma",
      "feature": "message actions",
      "action": "add message action",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_message_actions_remove",
      "type": "ma",
      "feature": "message actions",
      "action": "remove message action",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_message_actions_subscribe",
      "type": "ma",
      "feature": "message actions",
      "action": "receive message action",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_message_actions_unauthorized",
      "type": "ma",
      "feature": "message actions",
      "action": "unauthorized",
      "label": "",
      "description": ""
    }
  ];
}

export const getFunMetrics = () => {
  return [
    {
      "metric": "transaction_xhr",
      "type": "fun",
      "feature": "functions",
      "action": "execute function",
      "label": "",
      "description": ""
    }
  ];
}

export const getFreMetrics = () => {
  return [
    {
      "metric": "transaction_fire",
      "type": "fre",
      "feature": "fire",
      "action": "fire message",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_fire_client",
      "type": "fre",
      "feature": "fire",
      "action": "client fire",
      "label": "",
      "description": ""
    },
    {
      "metric": "transaction_fire_eh",
      "type": "fre",
      "feature": "fire",
      "action": "functions fire",
      "label": "",
      "description": ""
    }
  ];
}

