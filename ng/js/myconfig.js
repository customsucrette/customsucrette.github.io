var sucrette = {
    "avatar":{
        "skin":"hortensia",
        "hair":"brown",
        "eyebrows":"1-5b720362ccbfc015",
        "eyesColor":"brown",
        "eyes":"1-c8f85ec8f0f3ab2d",
        "mouth":"2-d52f3502c5814f22",
        "expressionPreset":7,

        "customSkin":null
    },
    "orderInfo":[
        {"category":"avatar", "layer":null, "value":null}, // solo es true si customSkin es != null
        {"category":"underwear", "layer":null, "value":"1-28645abdd790d028"},
        {"category":"hair", "layer":"back", "value":"auto"},
        {"category":"hair", "layer":"front", "value":"auto"},

        {"category":"top", "layer":null, "value":"2-b92ab71a1049048b"},
        {"category":"shoes", "layer":null, "value":"12-f8c37342c98686df"},
        {"category":"pants", "layer":null, "value":"22-d67ab5aa084af460"},
        {"category":"neckAccessory", "layer":null, "value":"32-d8cee995bcd500ea"},
        {"category":"jacket", "layer":null, "value":"42-bc96b1e4adedc947"},
        {"category":"bag", "layer":null, "value":"52-aff4468a19f20886"}
    ]
}

const zone = {
    "head":[
        {"category":"hat", "style":"left: 207.569px;top: 8.27506px;transform-origin: -133.647px 65.6468px;"},
        {"category":"wig", "style":"left: 238.199px;top: 54.1927px;transform-origin: -160.095px 28.9212px;"},
        {"category":"eyebrows", "style":"left: 248.843px;top: 108.353px;transform-origin: -173.537px -14.2941px;"},
        {"category":"faceAccessory", "style":"left: 237.868px;top: 162.448px;transform-origin: -172.588px -59.5419px;"},
        {"category":"earring", "style":"left: 206.957px;top: 208.177px;transform-origin: -157.344px -102.155px;"},
        {"category":"general", "style":"left: 160.853px;top: 238.526px;transform-origin: -129.379px -137.739px;"}
    ],
    "face":[
        {"category":"makeup", "style":"left: 238.617px; top: 13.6021px; transform-origin: -146.507px 78.5073px;"},
        {"category":"eyes", "style":"left: 270.318px; top: 58.8813px; transform-origin: -173.653px 42.2416px;"},
        {"category":"mouth", "style":"left: 284.616px; top: 112.274px; transform-origin: -189.479px -0.204304px;"},
        {"category":"neckAccessory", "style":"left: 279.785px; top: 167.336px; transform-origin: -192.701px -45.3897px;"},
        {"category":"expression", "style":"left: 256.408px; top: 217.423px; transform-origin: -183.059px -89.6518px;"},
        {"category":"general", "style":"left: 217.306px; top: 256.49px; transform-origin: -161.335px -129.403px;"}
    ],
    "torso":[
        {"category":"top", "style":"left: 285.189px; top: 21.5926px; transform-origin: -165.798px 97.7981px;"},
        {"category":"dress", "style":"left: 318.082px; top: 66.1084px; transform-origin: -193.722px 62.0748px;"},
        {"category":"jacket", "style":"left: 336.452px; top: 118.321px; transform-origin: -212.194px 20.6661px;"},
        {"category":"waist", "style":"left: 338.68px; top: 173.626px; transform-origin: -220.121px -23.9776px;"},
        {"category":"underwear", "style":"left: 324.567px; top: 227.147px; transform-origin: -217.034px -69.2144px;"},
        {"category":"general", "style":"left: 295.36px; top: 274.164px; transform-origin: -203.115px -112.367px;"}
    ],
    "arms":[
        {"category":"gloves", "style":"left: 311.062px; top: 26.0317px; transform-origin: -176.515px 108.515px;"},
        {"category":"bag", "style":"left: 344.47px; top: 70.1998px; transform-origin: -204.776px 73.0367px;"},
        {"category":"armAccessory", "style":"left: 364.596px; top: 121.793px; transform-origin: -224.387px 32.137px;"},
        {"category":"handNailPolish", "style":"left: 369.92px; top: 176.917px; transform-origin: -234.355px -12.1123px;"},
        {"category":"general", "style":"left: 360.04px; top: 231.408px; transform-origin: -234.176px -57.4703px;"}
    ],
    "waistToKnee":[
        {"category":"pants", "style":"left: 311.062px; top: 26.0317px; transform-origin: -176.515px 108.515px;"},
        {"category":"skirt", "style":"left: 344.47px; top: 70.1998px; transform-origin: -204.776px 73.0367px;"},
        {"category":"dress", "style":"left: 364.596px; top: 121.793px; transform-origin: -224.387px 32.137px;"},
        {"category":"waist", "style":"left: 369.92px; top: 176.917px; transform-origin: -234.355px -12.1123px;"},
        {"category":"underwear", "style":"left: 360.04px; top: 231.408px; transform-origin: -234.176px -57.4703px;"},
        {"category":"general", "style":"left: 335.702px; top: 281.153px; transform-origin: -223.858px -101.639px;"}
    ],
    "feet":[
        {"category":"shoes", "style":"left: 259.315px; top: 17.1534px; transform-origin: -155.081px 87.081px;"},
        {"category":"socks", "style":"left: 291.597px; top: 62.0685px; transform-origin: -182.605px 51.0749px;"},
        {"category":"legAccessory", "style":"left: 307.876px; top: 114.931px; transform-origin: -199.719px 9.10919px;"},
        {"category":"footNailPolish", "style":"left: 306.454px; top: 170.225px; transform-origin: -205.224px -35.8764px;"},
        {"category":"general", "style":"left: 287.48px; top: 222.181px; transform-origin: -198.735px -80.7306px;"}
    ],
    "general":[
        {"category":"skin", "style":"left: 466.275px; top: 52.6699px; transform-origin: -240.807px 172.807px;"},
        {"category":"tattoo", "style":"left: 501.603px; top: 95.4364px; transform-origin: -270.326px 138.303px;"},
        {"category":"other", "style":"left: 528.221px; top: 144.104px; transform-origin: -294.149px 99.6461px;"}
    ],
}