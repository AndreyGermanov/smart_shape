function Q() {
  this.subscriptions = {}, this.subscribe = (s, t) => {
    if (typeof s == "string")
      return this.subscribeToEvent(s, t);
    if (typeof s == "object") {
      for (let e of s)
        this.subscribeToEvent(e, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (s, t) => ((typeof this.subscriptions[s] > "u" || !this.subscriptions[s]) && (this.subscriptions[s] = []), typeof this.subscriptions[s].find((e) => e === t) < "u" ? null : (this.subscriptions[s].push(t), t)), this.emit = (s, t, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = s, e.target = t, typeof this.subscriptions[s] < "u" && this.subscriptions[s] && this.subscriptions[s].length) {
      for (let i of this.subscriptions[s])
        i(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (s, t) => {
    let e = !1;
    if (typeof s == "string")
      this.unsubscribeFromEvent(s, t) && (e = !0);
    else if (typeof s == "object")
      for (let i of s)
        this.unsubscribeFromEvent(i, t) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (s, t) => {
    if (typeof this.subscriptions[s] > "u" || !this.subscriptions[s])
      return !1;
    const e = this.subscriptions[s].indexOf(t);
    return e !== -1 ? (this.subscriptions[s].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const h = new Q(), J = (s) => s * (Math.PI / 180), Z = (s) => s * (180 / Math.PI), w = (s, t, e, i, o) => {
  const n = J(s), a = (t - i) * Math.cos(n) - (e - o) * Math.sin(n) + i, c = (t - i) * Math.sin(n) + (e - o) * Math.cos(n) + o;
  return [a, c];
}, P = (s, t, e, i) => Math.sqrt(Math.pow(e - s, 2) + Math.pow(i - t, 2)), X = (s, t) => {
  const e = (l, p, g) => p.x <= Math.max(l.x, g.x) && p.x >= Math.min(l.x, g.x) && p.y <= Math.max(l.y, g.y) && p.y >= Math.min(l.y, g.y), i = (l, p, g) => {
    let x = (p[1] - l[1]) * (g[0] - p[0]) - (p[0] - l[0]) * (g[1] - p[1]);
    return x === 0 ? 0 : x > 0 ? 1 : 2;
  }, o = (l, p, g, x) => {
    let _ = i(l, p, g), E = i(l, p, x), C = i(g, x, l), M = i(g, x, p);
    return _ !== E && C !== M || _ === 0 && e(l, g, p) || E === 0 && e(l, x, p) || C === 0 && e(g, l, x) ? !0 : !!(M === 0 && e(g, p, x));
  };
  if (s.length < 3)
    return !1;
  let n = [1e4, t[1]], a = 0, c = 0;
  do {
    let l = (c + 1) % s.length;
    if (o(s[c], s[l], t, n)) {
      if (i(s[c], t, s[l]) === 0)
        return e(
          s[c],
          t,
          s[l]
        );
      a++;
    }
    c = l;
  } while (c !== 0);
  return a % 2 === 1;
}, V = (s, t, e, i) => !s && !t || !e || !i ? [e, i] : s && t ? [s, t] : (s || (s = t * (e / i)), t || (t = s * (i / e)), [s, t]), I = (s, t = !0) => {
  let e = 0, i = 0;
  if (!t)
    return { top: s.offsetTop - s.scrollTop, left: s.offsetLeft - s.scrollLeft };
  for (; s && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
    e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
  return { top: i, left: e };
}, R = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(s) {
  const t = Math.random() * 16 | 0;
  return (s === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), G = (s) => {
  try {
    s.stopPropagation && s.stopPropagation(), s.preventDefault && s.preventDefault(), s.cancelBubble = !0, s.returnValue = !1;
  } catch {
  }
  return !1;
}, m = (s) => typeof s < "u" && s !== null, y = (s, t) => s && typeof s == "object" && t && typeof t == "object" ? Object.assign(s, t) : s, K = (s) => {
  const t = atob(s.split(",")[1]), e = s.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i);
  for (let n = 0; n < t.length; n++)
    o[n] = t.charCodeAt(n);
  return new Blob([i], { type: e });
}, k = (s) => new Promise((t) => {
  const e = new FileReader();
  e.onload = function(i) {
    t(i.target.result);
  }, e.readAsDataURL(s);
}), N = (s) => {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}, q = (s) => {
  let t = s, e = t.indexOf("-");
  for (; e !== -1; )
    t = t.replace("-" + t[e + 1], t[e + 1].toString().toUpperCase()), e = t.indexOf("-");
  return t;
}, d = (s, t = {}) => {
  const e = {};
  for (let i in s)
    i !== "type" && i !== "target" && (e[i] = s[i]);
  return Object.keys(t).forEach((i) => {
    e[i] = t[i];
  }), e;
}, H = (s, t = null) => (t || (t = s.target.root || s.target), j(t, s.pageX, s.pageY)), j = (s, t, e) => {
  const i = I(s, !0);
  return [t - i.left, e - i.top];
};
function $(s) {
  this.menu = s, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let t of this.menu.items)
        this.setItemStyles(t);
    }
  }, this.setItemStyles = (t) => {
    this.setItemDivStyles(t), this.setItemSpanStyles(t), this.setItemImageStyles(t);
  }, this.setItemDivStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    !e || (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][O.ITEM] ? e.className = this.itemsCssClassesById[t.id][O.ITEM] : this.itemCssClass ? e.className = this.itemCssClass || "" : (e.className = "", e.style.display = "flex", e.style.flexDirection = "row", e.style.alignItems = "center", e.style.paddingTop = "2px", e.style.paddingLeft = "3px", e.style.paddingRight = "3px", e.addEventListener("mouseover", () => {
      e.style.backgroundColor = "#0066CC", e.style.color = "white";
    }), e.addEventListener("mouseout", () => {
      e.style.backgroundColor = "transparent", e.style.color = "black";
    })), e.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const i = e.querySelector("span");
    i && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][O.TEXT] ? i.className = this.itemsCssClassesById[t.id][O.TEXT] : this.itemTextCssClass ? i.className = this.itemTextCssClass : (i.className = "", i.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const i = e.querySelector("img");
    i && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][O.IMAGE] ? i.className = this.itemsCssClassesById[t.id][O.IMAGE] : this.itemImageCssClass ? i.className = this.itemImageCssClass : i.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "", this.menu.drawMenu();
  }, this.setItemClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, O.ITEM, t), this.menu.drawMenu();
      return;
    }
    this.itemCssClass = t || "", this.menu.drawMenu();
  }, this.setTextClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, O.TEXT, t), this.menu.drawMenu();
      return;
    }
    this.itemTextCssClass = t || "", this.menu.drawMenu();
  }, this.setImageClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, O.IMAGE, t), this.menu.drawMenu();
      return;
    }
    this.itemImageCssClass = t || "", this.menu.drawMenu();
  }, this.setClassForItem = (t, e, i) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][e] = i;
  };
}
const O = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
};
function tt() {
  this.subscriptions = {}, this.subscribe = (s, t) => {
    if (typeof s == "string")
      return this.subscribeToEvent(s, t);
    if (typeof s == "object") {
      for (let e of s)
        this.subscribeToEvent(e, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (s, t) => ((typeof this.subscriptions[s] > "u" || !this.subscriptions[s]) && (this.subscriptions[s] = []), typeof this.subscriptions[s].find((e) => e === t) < "u" ? null : (this.subscriptions[s].push(t), t)), this.emit = (s, t, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = s, e.target = t, typeof this.subscriptions[s] < "u" && this.subscriptions[s] && this.subscriptions[s].length) {
      for (let i of this.subscriptions[s])
        i(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (s, t) => {
    let e = !1;
    if (typeof s == "string")
      this.unsubscribeFromEvent(s, t) && (e = !0);
    else if (typeof s == "object")
      for (let i of s)
        this.unsubscribeFromEvent(i, t) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (s, t) => {
    if (typeof this.subscriptions[s] > "u" || !this.subscriptions[s])
      return !1;
    const e = this.subscriptions[s].indexOf(t);
    return e !== -1 ? (this.subscriptions[s].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const L = new tt(), st = (s, t = {}) => {
  const e = {};
  for (let i in s)
    i !== "type" && i !== "target" && (e[i] = s[i]);
  return Object.keys(t).forEach((i) => {
    e[i] = t[i];
  }), e;
}, et = (s) => new Promise((t) => {
  const e = new FileReader();
  e.onload = function(i) {
    t(i.target.result);
  }, e.readAsDataURL(s);
});
function it(s, t, e = null) {
  this.panel = null, this.container = t, this.items = s, this.event = e || "contextmenu", this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new $(this)), this.container.addEventListener(this.event, (i) => (this.onEvent(i), !1)), document.addEventListener("mouseup", (i) => {
    i.button !== 2 && this.hide();
  }), this), this.onEvent = (i) => {
    this.origEvent = i, i.preventDefault(), i.stopPropagation(), i.cancelBubble = !0, this.cursorX = i.pageX, this.cursorY = i.pageY, this.show();
  }, this.drawMenu = () => new Promise(async (i) => {
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel = document.createElement("div"), this.panel.style.visibility = "hidden", !this.overflowY && document.body.style.overflowY !== "clip" && (this.overflowY = document.body.style.overflowY), document.body.style.overflowY = "clip", document.body.appendChild(this.panel);
    for (let o of this.items) {
      if (this.panel.querySelector("#" + o.id))
        continue;
      const n = document.createElement("div");
      n.id = o.id, n.style.cursor = "pointer";
      const a = document.createElement("span");
      a.innerHTML = o.title, n.appendChild(a), this.panel.appendChild(n);
    }
    this.setStyles(), await this.drawImages(), setTimeout(() => {
      this.setItemsEventListeners(), this.adjustImagesWidth(this.maxImageHeight), this.setStyles(), this.panel && (this.panel.style.display = "none", this.panel.style.visibility = "visible", document.body.style.overflowY = this.overflowY, i());
    }, 100);
  }), this.drawImages = async () => {
    if (!this.panel)
      return;
    const i = this.items.filter((n) => n.image && typeof n.image < "u");
    this.maxImageHeight = 0;
    let o = {};
    for (let n of i) {
      const a = new Image();
      if (!this.panel)
        continue;
      const c = this.panel.querySelector("#" + n.id + " > span");
      a.style.display = "none";
      const l = await et(await (await fetch(n.image)).blob());
      a.src = l, o[n.id] = () => {
        !this.panel || (a.height = this.panel.querySelector("#" + n.id).clientHeight, a.height > this.maxImageHeight && (this.maxImageHeight = a.height), a.style.verticalAlign = "middle", a.style.marginRight = "5px", a.style.display = "", a.removeEventListener("load", o[n.id]));
      }, a.addEventListener("load", o[n.id]);
      try {
        this.panel.querySelector("#" + n.id + " img") || this.panel.querySelector("#" + n.id).insertBefore(a, c);
      } catch {
      }
    }
  }, this.setItemsEventListeners = () => {
    for (let i of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      for (let o of this.items)
        this.listeners[i + "_" + o.id] = (n) => {
          !this.origEvent || (L.emit(i, this.origEvent.target, st(n, {
            container: this.container,
            owner: this,
            cursorX: this.cursorX,
            cursorY: this.cursorY,
            itemId: o.id
          })), setTimeout(() => {
            ["click", "mousedown", "mouseup", "dblclick"].indexOf(i) !== -1 && this.hide();
          }, 100));
        }, this.panel.querySelector("#" + o.id).addEventListener(i, this.listeners[i + "_" + o.id]);
  }, this.adjustImagesWidth = (i) => {
    if (!!this.panel)
      for (let o of this.panel.querySelectorAll("img")) {
        const n = document.createElement("canvas");
        n.width = i, n.height = i, n.getContext("2d").drawImage(o, Math.round(i / 2 - o.width / 2), 0, o.width, o.height), o.src = n.toDataURL();
      }
  }, this.show = async () => {
    if (await this.drawMenu(), !this.panel)
      return;
    let i = this.cursorX, o = this.cursorY;
    this.panel.style.left = i + "px", this.panel.style.top = o + "px", this.panel.style.zIndex = "10000", this.panel.style.display = "", this.panel.style.visibility = "visible", this.panel.style.position = "absolute", i + this.panel.clientWidth > window.innerWidth && (i = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = i + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (o = o - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = o + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (i, o, n = null) => {
    const a = { id: i, title: o };
    n && (a.image = n), this.items.push(a), this.drawMenu();
  }, this.removeItem = (i) => {
    this.items.splice(this.items.findIndex((o) => o.id === i), 1), this.drawMenu();
  }, this.findItemById = (i) => Array.from(this.panel.querySelectorAll("div")).find((o) => o.id === i), this.setId = (i) => this.panel.id = i, this.addEventListener = (i, o) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const n = L.subscribe(i, (a) => {
      a.owner === this && o(a);
    });
    return this.subscriptions[i].push(n), n;
  }, this.removeEventListener = (i, o) => {
    this.subscriptions[i] && typeof this.subscriptions[i] < "u" && this.subscriptions[i].splice(this.subscriptions[i].indexOf(o), 1), L.unsubscribe(i, o);
  }, this.on = (i, o) => this.addEventListener(i, o), this.off = (i, o) => {
    this.removeEventListener(i, o);
  }, this.removeAllEventListeners = () => {
    for (let i in this.subscriptions)
      for (let o of this.subscriptions[i])
        L.unsubscribe(i, o);
    if (this.subscriptions = {}, !!this.panel)
      for (let i in this.listeners) {
        const [o, n] = i.split("_"), a = this.panel.querySelector("#" + n);
        a && a.removeEventListener(o, this.listeners[i]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null;
  };
}
function ot() {
  this.create = (s, t, e) => new it(s, t, e).init();
}
const z = new ot();
try {
  window.Menus = z;
} catch {
}
const nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", at = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", At = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Et = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", F = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", mt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC";
function vt(s) {
  this.point = s, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.point.options.canDelete && this.init(), this.point.contextMenu = this.contextMenu;
  }, this.init = () => {
    this.point.element && (this.contextMenu = z.create([
      { id: "i" + this.point.guid + "_delete", title: "Delete point", image: F }
    ], this.point.element), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (t) => {
      t.itemId === "i" + s.guid + "_delete" && h.emit(u.POINT_DELETE_REQUEST, this.point);
    });
  };
}
function St() {
  return this.options = {
    id: "",
    width: 10,
    height: 10,
    classes: "",
    style: {
      "border-width": "1px",
      "border-style": "solid",
      "border-color": "black",
      "border-radius": "25px",
      cursor: "pointer",
      "background-color": "red"
    },
    canDrag: !0,
    canDelete: !1,
    zIndex: 1e3,
    bounds: {},
    moveDirections: [
      f.LEFT,
      f.TOP,
      f.RIGHT,
      f.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = R(), this.subscriptions = {}, this.init = (s, t, e = null) => (this.x = parseInt(s), this.y = parseInt(t), Object.assign(this, new vt(this)), this.element = this.createPointUI(), this.setOptions(Object.assign({}, e)), this.setEventListeners(), h.emit(u.POINT_ADDED, this), this), this.setOptions = (s) => {
    s && typeof s == "object" && (s.style && typeof s.style == "object" && (s.style = Object.assign(this.options.style, s.style)), Object.assign(this.options, s)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const s = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(s) : s;
  }, this.setPointStyles = (s = null) => {
    if (s == null && (s = this.element), this.options.id && (this.element.id = this.options.id), s.className = this.options.classes, s.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        s.style[q(t)] = this.options.style[t];
    return s.style.width = this.options.width + "px", s.style.height = this.options.height + "px", s.style.left = this.x - parseInt(this.options.width / 2) + "px", s.style.top = this.y - parseInt(this.options.height / 2) + "px", s.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? s.style.display = "none" : s.style.display = "", s.style.position = "absolute", typeof this.updateContextMenu == "function" && this.updateContextMenu(), s;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (s, t, e) => {
    const [i, o] = w(s, this.x, this.y, t, e);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove), h.subscribe(U.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (s) => {
    h.emit(u.POINT_MOUSE_DOWN, this, d(s)), s.buttons === 1 && this.options.canDrag && (h.emit(u.POINT_DRAG_START, this, d(s)), G(s));
  }, this.mousemove = (s) => {
    if (h.emit(u.POINT_MOUSE_MOVE, this, d(s)), s.buttons !== 1 || !this.options.canDrag || !b.draggedShape || b.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, e = this.y, i = I(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + s.movementX, this.y + s.movementY)) {
      h.emit(u.POINT_DRAG_MOVE, this, d(s, { oldX: t, oldY: e }));
      return;
    }
    let o = s.clientX + window.scrollX - i.left - this.options.width / 2, n = s.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, t, e), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(u.POINT_DRAG_MOVE, this, d(s, { oldX: t, oldY: e }));
  }, this.mouseover = (s) => {
    h.emit(u.POINT_MOUSE_OVER, this, d(s));
  }, this.mouseout = (s) => {
    h.emit(u.POINT_MOUSE_OUT, this, d(s));
  }, this.click = (s) => {
    h.emit(u.POINT_MOUSE_CLICK, this, d(s));
  }, this.doubleclick = (s) => {
    h.emit(u.POINT_MOUSE_DOUBLE_CLICK, this, d(s));
  }, this.checkFitBounds = (s, t) => !(this.options.bounds.left !== -1 && s < this.options.bounds.left || this.options.bounds.right !== -1 && s > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (s, t, e, i) => (t > i && this.options.moveDirections.indexOf(f.BOTTOM) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(f.TOP) === -1 && (t = i), s > e && this.options.moveDirections.indexOf(f.RIGHT) === -1 && (s = e), s < e && this.options.moveDirections.indexOf(f.LEFT) === -1 && (s = e), s > this.options.bounds.right && this.options.bounds.right !== -1 && (s = this.options.bounds.right), t > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (t = this.options.bounds.bottom), s < this.options.bounds.left && this.options.bounds.left !== -1 && (s = this.options.bounds.left), t < this.options.bounds.top && this.options.bounds.top !== -1 && (t = this.options.bounds.top), [s, t]), this.mouseup = (s) => {
    h.emit(u.POINT_MOUSE_UP, this, d(s)), s.button !== 2 && h.emit(u.POINT_DRAG_END, this, d(s));
  }, this.onBoundsChange = (s) => {
    s.points.find((t) => t === this) && (this.options.bounds = s.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: Object.assign({}, this.options)
  }), this.fromJSON = (s) => {
    let t = s;
    if (typeof t == "string" && (t = N(s)), !t)
      return null;
    this.x = t.x, this.y = t.y;
    let e = !1;
    return this.element || (e = !0, this.element = document.createElement("div")), this.setOptions(t.options), e && h.emit(u.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove), h.unsubscribe(U.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), h.emit(u.POINT_DESTROYED, this);
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((e) => h.unsubscribe(s, e)), this.subscriptions[s] = [];
  }, this.addEventListener = (s, t) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const e = h.subscribe(s, (i) => {
      i.target && i.target.guid === this.guid && t(i);
    });
    return this.subscriptions[s].push(e), e;
  }, this.removeEventListener = (s, t) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(t), 1), h.unsubscribe(s, t);
  }, this;
}
const u = {
  POINT_ADDED: "create",
  POINT_DESTROYED: "destroy",
  POINT_DRAG_START: "move_start",
  POINT_DRAG_MOVE: "move",
  POINT_DRAG_END: "move_end",
  POINT_MOUSE_DOWN: "mousedown",
  POINT_MOUSE_MOVE: "mousemove",
  POINT_MOUSE_UP: "mouseup",
  POINT_MOUSE_OVER: "mouseover",
  POINT_MOUSE_OUT: "mouseout",
  POINT_MOUSE_CLICK: "click",
  POINT_MOUSE_DOUBLE_CLICK: "dblclick",
  POINT_DELETE_REQUEST: "point_delete_request"
}, f = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function yt(s) {
  this.rotateBox = s, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(u.POINT_DRAG_START, (e) => {
        this.onPointMouseDown(e), h.emit(r.POINT_DRAG_START, this.rotateBox, { point: t });
      }), t.mouseUpListener = t.addEventListener(u.POINT_DRAG_END, (e) => {
        this.onPointMouseUp(e), h.emit(r.POINT_DRAG_END, this.rotateBox, { point: t });
      });
    });
  }, this.interceptEventsFromShape = () => {
    r.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.rotateBox.shape.addEventListener(t.name, (e) => {
        t.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), h.emit(t.name, this.rotateBox, e);
      });
    });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      h.emit(r.SHAPE_MOUSE_MOVE, this.rotateBox.shape, d(t, { clientX: t.clientX, clientY: t.clientY }));
      return;
    }
    const [e, i] = H(t, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let a = this.calcAngle(e, i, o, n);
    if (a === null)
      return;
    let c = a;
    this.previousAngle && (c -= this.previousAngle), this.previousAngle = a, h.emit(B.ROTATE_BOX_ROTATE, this.rotateBox, { angle: c });
  }, this.calcAngle = (t, e, i, o) => {
    const n = this.calcHypotenuse(t, e, i, o);
    if (n <= 0)
      return null;
    const a = this.calcCathetus(t, e, i, o), c = this.calcStartAngle(t, e, i, o);
    return Math.round(Z(Math.asin(a / n)) + c + this.initialAngle);
  }, this.calcHypotenuse = (t, e, i, o) => P(t, e, i, o), this.calcCathetus = (t, e, i, o) => {
    if (t <= i && e <= o)
      return P(t, e, t, o);
    if (t >= i && e <= o)
      return P(t, e, i, e);
    if (t >= i && e >= o)
      return P(t, e, t, o);
    if (t <= i && e >= o)
      return P(t, e, i, e);
  }, this.calcStartAngle = (t, e, i, o) => {
    if (t <= i && e <= o)
      return 0;
    if (t >= i && e <= o)
      return 90;
    if (t >= i && e >= o)
      return 180;
    if (t <= i && e >= o)
      return 270;
  }, this.onPointMouseDown = (t) => {
    switch (t.target) {
      case this.rotateBox.left_top:
        this.initialAngle = -45;
        break;
      case this.rotateBox.right_top:
        this.initialAngle = -135;
        break;
      case this.rotateBox.right_bottom:
        this.initialAngle = -225;
        break;
      case this.rotateBox.left_bottom:
        this.initialAngle = -315;
        break;
    }
    this.rotateBox.shape.points.forEach((e) => e.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (t) => {
    this.rotateBox.shape.points.forEach((e) => {
      e.setOptions({ visible: !0 }), e.redraw();
    });
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = h.subscribe(t, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && e(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), h.unsubscribe(t, e);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.rotateBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), this.rotateBox.shape.points.forEach((t) => {
      t.removeEventListener(u.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(u.POINT_DRAG_END, t.mouseUpListener);
    });
  };
}
const B = {
  ROTATE_BOX_ROTATE: "rotate"
};
function Bt(s) {
  this.resizeBox = s, this.subscriptions = {
    resize: []
  }, this.guid = R(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(u.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(u.POINT_DRAG_END, this.onPointDragMove), r.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.resizeBox.shape.addEventListener(t.name, (e) => {
        h.emit(t.name, this.resizeBox, e);
      });
    });
  }, this.onPointDragMove = (t) => {
    if (!this.resizeBox.shape.isShapePoint(t.target))
      return;
    switch (t.target) {
      case this.resizeBox.left_top:
        this.onLeftTopDragMove(t);
        break;
      case this.resizeBox.center_top:
        this.onCenterTopDragMove(t);
        break;
      case this.resizeBox.right_top:
        this.onRightTopDragMove(t);
        break;
      case this.resizeBox.right_center:
        this.onRightCenterDragMove(t);
        break;
      case this.resizeBox.right_bottom:
        this.onRightBottomDragMove(t);
        break;
      case this.resizeBox.center_bottom:
        this.onCenterBottomDragMove(t);
        break;
      case this.resizeBox.left_bottom:
        this.onLeftBottomDragMove(t);
        break;
      case this.resizeBox.left_center:
        this.onLeftCenterDragMove(t);
        break;
    }
    this.resizeBox.adjustCenters(), this.resizeBox.setPointsMoveBounds();
    const e = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const i = this.resizeBox.getPosition();
    this.resizeBox.redraw(), h.emit(r.POINT_DRAG_END, this.resizeBox, d(t, { point: t.target })), h.emit(T.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: e, newPos: i });
  }, this.onLeftTopDragMove = (t) => {
    this.resizeBox.left_center.x = t.target.x, this.resizeBox.left_bottom.x = t.target.x, this.resizeBox.center_top.y = t.target.y, this.resizeBox.right_top.y = t.target.y;
  }, this.onCenterTopDragMove = (t) => {
    this.resizeBox.left_top.y = t.target.y, this.resizeBox.right_top.y = t.target.y;
  }, this.onRightTopDragMove = (t) => {
    this.resizeBox.left_top.y = t.target.y, this.resizeBox.center_top.y = t.target.y, this.resizeBox.right_center.x = t.target.x, this.resizeBox.right_bottom.x = t.target.x;
  }, this.onRightCenterDragMove = (t) => {
    this.resizeBox.right_top.x = t.target.x, this.resizeBox.right_bottom.x = t.target.x;
  }, this.onRightBottomDragMove = (t) => {
    this.resizeBox.right_top.x = t.target.x, this.resizeBox.right_center.x = t.target.x, this.resizeBox.left_bottom.y = t.target.y, this.resizeBox.center_bottom.y = t.target.y;
  }, this.onCenterBottomDragMove = (t) => {
    this.resizeBox.left_bottom.y = t.target.y, this.resizeBox.right_bottom.y = t.target.y;
  }, this.onLeftBottomDragMove = (t) => {
    this.resizeBox.center_bottom.y = t.target.y, this.resizeBox.right_bottom.y = t.target.y, this.resizeBox.left_center.x = t.target.x, this.resizeBox.left_top.x = t.target.x;
  }, this.onLeftCenterDragMove = (t) => {
    this.resizeBox.left_bottom.x = t.target.x, this.resizeBox.left_top.x = t.target.x;
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = h.subscribe(t, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && e(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), h.unsubscribe(t, e);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.resizeBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), h.unsubscribe(u.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(u.POINT_DRAG_END, this.onPointDragMove);
  };
}
const T = {
  RESIZE_BOX_RESIZE: "resize"
};
function _t(s) {
  this.shape = s, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = s, this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(u.POINT_DESTROYED, this.onPointDestroyed), h.subscribe(u.POINT_ADDED, this.onPointAdded), h.subscribe(u.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(u.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (t) => {
      b.mouseover(d(t, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (t) => {
      b.mouseout(d(t, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (t) => {
      b.mouseenter(d(t, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (t) => {
      b.mousedown(d(t, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (t) => {
      b.click(d(t, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (t) => {
      b.doubleclick(d(t, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(T.RESIZE_BOX_RESIZE, (t) => {
      const e = this.shape.getRootParent();
      if (e) {
        h.emit(T.RESIZE_BOX_RESIZE, e.resizeBox, { newPos: t.newPos, oldPos: t.oldPos });
        return;
      }
      const i = t.newPos.left - t.oldPos.left, o = t.newPos.top - t.oldPos.top;
      this.shape.moveBy(i, o);
      const [n, a] = this.shape.getMaxPointSize();
      this.shape.scaleTo(t.newPos.width - n * 2, t.newPos.height - a * 2), this.shape.redraw(), h.emit(T.RESIZE_BOX_RESIZE, this.shape, t);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOVE_START, (t) => {
      this.mousedown(t);
    }), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_MOVE, (t) => {
      this.mousemove(t);
    }), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_CLICK, (t) => {
      this.click(t);
    }), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, (t) => {
      this.svg_dblclick(t);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOWN, (t) => {
      this.svg_mousedown(t);
    }), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_UP, (t) => {
      h.emit(r.SHAPE_MOUSE_UP, this.shape, d(t));
    }), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OVER, (t) => {
      this.svg_mouseover(t);
    }), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OUT, (t) => {
      this.svg_mouseout(t);
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(B.ROTATE_BOX_ROTATE, (t) => {
      const e = this.shape.getRootParent();
      if (e) {
        h.emit(B.ROTATE_BOX_ROTATE, e.rotateBox, { angle: t.angle });
        return;
      }
      e ? (e.rotateBy(t.angle), e.redraw(), h.emit(B.ROTATE_BOX_ROTATE, e, t)) : (this.shape.rotateBy(t.angle), this.shape.redraw(), h.emit(B.ROTATE_BOX_ROTATE, this.shape, t));
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOVE_START, (t) => {
      this.mousedown(t);
    }), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_MOVE, (t) => {
      this.mousemove(t);
    }), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_CLICK, (t) => {
      this.click(t);
    }), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, (t) => {
      this.svg_dblclick(t);
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOWN, (t) => {
      this.svg_mousedown(t);
    }), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_UP, (t) => {
      h.emit(r.SHAPE_MOUSE_UP, this.shape, d(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OVER, (t) => {
      this.svg_mouseover(t);
    }), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OUT, (t) => {
      this.svg_mouseout(t);
    }), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(!0);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null, this.shape.points.forEach((e) => {
        e.options.hidden || (e.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.mousedown = (t) => {
    G(t), h.emit(r.SHAPE_MOUSE_DOWN, this.shape, d(t)), setTimeout(() => {
      h.emit(r.SHAPE_MOVE_START, this.shape, d(t, { pos: this.shape.getPosition(!0) }));
    }, 100);
  }, this.mousemove = (t) => {
    if (this.shape.draggedPoint || h.emit(r.SHAPE_MOUSE_MOVE, this.shape, d(t)), this.shape.draggedPoint) {
      h.emit(r.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(t);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [e, i] = this.calcMovementOffset(t);
    if (e === null || i === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(e, i), this.shape.redraw();
    const n = this.shape.getPosition(!0);
    h.emit(r.SHAPE_MOVE, this.shape, d(t, { oldPos: o, newPos: n }));
  }, this.mouseenter = (t) => {
    h.emit(r.SHAPE_MOUSE_ENTER, this.shape, d(t));
  }, this.mouseover = (t) => {
    b.draggedShape !== this.shape && h.emit(r.SHAPE_MOUSE_OVER, this.shape, d(t));
  }, this.mouseout = (t) => {
    h.emit(r.SHAPE_MOUSE_OUT, this.shape, d(t));
  }, this.click = (t) => {
    h.emit(r.SHAPE_MOUSE_CLICK, this.shape, d(t));
  }, this.doubleclick = (t) => {
    h.emit(r.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, d(t));
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const e = this.shape.getPosition(!0);
    let i = t.movementX, o = t.movementY, n = t.clientX + window.scrollX, a = t.clientY + window.scrollY;
    const c = e.left + i, l = e.top + o, p = I(this.shape.root, !0), g = this.shape.getBounds();
    return c < g.left || c + e.width > g.right ? [null, null] : l < g.top || l + e.height > g.bottom ? [null, null] : (n < c + p.left && (i = n - (c + p.left)), a < l + p.top && (o = a - (l + p.top)), n > c + e.width + p.left && (i = n - (e.width + p.left + e.left)), a > l + e.height + p.right && (o = a - (e.height + p.top + e.top)), [i, o]);
  }, this.onPointAdded = (t) => {
    !this.shape.isShapePoint(t.target) || h.emit(r.POINT_ADDED, this.shape, { point: t.target });
  }, this.onPointDragMove = (t) => {
    this.shape.isShapePoint(t.target) && this.shape.redraw();
  }, this.onPointDestroyed = (t) => {
    !this.shape.isShapePoint(t.target) || (this.shape.points.splice(this.shape.points.indexOf(t.target), 1), this.shape.root.removeChild(t.target.element), this.shape.redraw(), h.emit(r.POINT_DESTROYED, this.shape, { point: t.target }));
  }, this.onPointDeleteRequest = (t) => {
    !this.shape.isShapePoint(t.target) || this.shape.deletePoint(t.target.x, t.target.y);
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = h.subscribe(t, (o) => {
      o.target && o.target.guid === this.shape.guid && e(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), h.unsubscribe(t, e);
  }, this.destroy = () => {
    h.unsubscribe(u.POINT_ADDED, this.onPointAdded), h.unsubscribe(u.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(u.POINT_DESTROYED, this.onPointDestroyed), h.unsubscribe(u.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(T.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(B.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener));
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
  };
}
const r = {
  SHAPE_CREATE: "create",
  SHAPE_MOVE_START: "move_start",
  SHAPE_MOVE: "move",
  SHAPE_MOVE_END: "move_end",
  SHAPE_MOUSE_MOVE: "mousemove",
  SHAPE_MOUSE_ENTER: "mouseenter",
  SHAPE_MOUSE_OVER: "mouseover",
  SHAPE_MOUSE_OUT: "mouseout",
  SHAPE_MOUSE_DOWN: "mousedown",
  SHAPE_MOUSE_UP: "mouseup",
  SHAPE_MOUSE_CLICK: "click",
  SHAPE_MOUSE_DOUBLE_CLICK: "dblclick",
  SHAPE_DESTROY: "destroy",
  POINT_ADDED: "point_added",
  POINT_DESTROYED: "point_destroyed",
  POINT_DRAG_START: "point_drag_start",
  POINT_DRAG_MOVE: "point_drag_move",
  POINT_DRAG_END: "point_drag_end",
  SHAPE_RESIZE: "resize",
  SHAPE_ROTATE: "rotate",
  getShapeMouseEvents: () => Object.keys(r).filter((s) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(s) === -1 && typeof r[s] != "function").map((s) => ({ key: s, name: r[s] }))
};
function Ct() {
  this.draw = (s) => {
    if (s.points.length < 1)
      return;
    if (s.svg)
      try {
        s.eventListener.removeSvgEventListeners(), s.svg.innerHTML = "";
      } catch {
      }
    else
      s.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), s.svg.ondragstart = function() {
        return !1;
      }, s.eventListener.setSvgEventListeners(), s.root.appendChild(s.svg);
    this.updateOptions(s);
    const t = this.drawPolygon(s);
    s.svg.appendChild(t);
  }, this.updateOptions = (s) => {
    if (!s.svg || typeof s.svg > "u")
      return;
    typeof s.options.visible < "u" && (s.svg.style.display = s.options.visible ? "" : "none"), s.calcPosition(), s.svg.id = s.options.id, s.svg.style.position = "absolute", s.svg.style.cursor = "default", s.svg.style.left = s.left, s.svg.style.top = s.top, s.svg.setAttribute("width", s.width), s.svg.setAttribute("height", s.height), this.setupShapeFill(s), this.setupSVGFilters(s), s.svg.style.zIndex = s.options.zIndex;
    const t = s.getRootParent();
    this.updatePoints(s, t), this.redrawResizeBox(t || s), this.redrawRotateBox(t || s);
  }, this.updatePoints = (s, t) => {
    s.points.forEach((e) => {
      e.options.zIndex < s.options.zIndex + 2 && (e.options.zIndex = s.options.zIndex + 2), s.options.visible || (e.options.visible = !1), e.redraw(), s.options.displayMode === A.DEFAULT && !e.options.forceDisplay && ((!t || t && t.options.displayMode === A.DEFAULT) && (e.element.style.display = "none"), s.options.visible || (e.options.visible = !1));
    });
  }, this.drawPolygon = (s) => {
    let t = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    s.points.length > 2 && (t = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const e = s.points.map((i) => "" + (i.x - s.left) + "," + (i.y - s.top)).join(" ");
    return t.setAttribute("points", e), this.setupPolygonStroke(s, t), this.setupPolygonFill(s, t), this.setupPolygonStyles(s, t), s.svg.querySelector("defs") && s.svg.querySelector("defs").querySelector("filter") && (t.style.filter = 'url("#' + s.guid + '_filter")'), t.style.zIndex = s.options.zIndex, t;
  }, this.redrawResizeBox = (s) => {
    if (!s.resizeBox)
      return;
    const t = s.getResizeBoxBounds();
    s.resizeBox.left = t.left, s.resizeBox.top = t.top, s.resizeBox.width = t.width, s.resizeBox.height = t.height, s.resizeBox.options.zIndex = s.options.zIndex + 1, s.resizeBox.redraw();
  }, this.redrawRotateBox = (s) => {
    if (!s.rotateBox)
      return;
    const t = s.getResizeBoxBounds();
    s.rotateBox.left = t.left, s.rotateBox.top = t.top, s.rotateBox.width = t.width, s.rotateBox.height = t.height, s.rotateBox.options.zIndex = s.options.zIndex + 1, s.rotateBox.redraw();
  }, this.setupShapeFill = (s) => {
    if (s.options.fillImage && typeof s.options.fillImage == "object") {
      const t = document.createElementNS(s.svg.namespaceURI, "defs"), e = this.createImageFill(s);
      e && t.appendChild(e), s.svg.appendChild(t);
    } else if (s.options.fillGradient && typeof s.options.fillGradient == "object" && ["linear", "radial"].indexOf(s.options.fillGradient.type) !== -1) {
      const t = document.createElementNS(s.svg.namespaceURI, "defs"), e = this.createGradient(s);
      t.appendChild(e), s.svg.appendChild(t);
    }
  }, this.createGradient = (s) => {
    let t = document.createElementNS(s.svg.namespaceURI, "linearGradient");
    const e = s.options.fillGradient;
    e.type === "radial" && (t = document.createElementNS(s.svg.namespaceURI, "radialGradient")), t.id = s.guid + "_gradient";
    let i = !1;
    for (let o in e)
      if (o !== "type") {
        if (o === "steps") {
          i = !0;
          continue;
        }
        t.setAttribute(o, e[o]);
      }
    if (!i)
      return t;
    for (let o of e.steps) {
      const n = document.createElementNS(s.svg.namespaceURI, "stop");
      m(o.stopColor) && n.setAttribute("offset", o.offset), m(o.stopColor) && n.setAttribute("stop-color", o.stopColor), m(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), t.appendChild(n);
    }
    return t;
  }, this.createImageFill = (s) => {
    const t = s.options.fillImage;
    if (!t.href || !t.width || !t.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const e = document.createElementNS(s.svg.namespaceURI, "pattern");
    e.setAttribute("id", s.guid + "_pattern"), e.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in t)
      o !== "href" && e.setAttribute(o, t[o]);
    const i = document.createElementNS(s.svg.namespaceURI, "image");
    return t.href && i.setAttribute("href", t.href), i.setAttribute("width", t.width), i.setAttribute("height", t.height), e.appendChild(i), e;
  }, this.setupSVGFilters = (s) => {
    if (s.options.filters && typeof s.options.filters == "object" && Object.keys(s.options.filters).length) {
      let t = s.svg.querySelector("defs");
      t || (t = document.createElementNS(s.svg.namespaceURI, "defs"), s.svg.appendChild(t));
      const e = this.createSVGFilters(s);
      t.append(e);
    }
  }, this.createSVGFilters = (s) => {
    const t = document.createElementNS(s.svg.namespaceURI, "filter");
    t.setAttribute("id", s.guid + "_filter");
    for (let e in s.options.filters) {
      const i = this.createSVGFilter(s, e, s.options.filters[e]);
      t.appendChild(i);
    }
    return t;
  }, this.createSVGFilter = (s, t, e) => {
    const i = document.createElementNS(s.svg.namespaceURI, t);
    for (let o in e)
      i.setAttribute(o, e[o].toString()), o === "dx" && s.svg.setAttribute("width", (s.width + parseInt(e.dx) * 2).toString()), o === "dy" && s.svg.setAttribute("height", (s.height + parseInt(e.dy) * 2).toString());
    return i;
  }, this.setupPolygonStroke = (s, t) => {
    m(s.options.stroke) && t.setAttribute("stroke", s.options.stroke), m(s.options.strokeWidth) && t.setAttribute("stroke-width", s.options.strokeWidth), m(s.options.strokeLinecap) && t.setAttribute("stroke-linecap", s.options.strokeLinecap), m(s.options.strokeDasharray) && t.setAttribute("stroke-dasharray", s.options.strokeDasharray);
  }, this.setupPolygonFill = (s, t) => {
    s.options.fillImage && typeof s.options.fillImage == "object" ? t.setAttribute("fill", 'url("#' + s.guid + '_pattern")') : s.options.fillGradient && typeof s.options.fillGradient == "object" && ["linear", "radial"].indexOf(s.options.fillGradient.type) !== -1 ? t.setAttribute("fill", 'url("#' + s.guid + '_gradient")') : s.options.fill && t.setAttribute("fill", s.options.fill), m(s.options.fillOpacity) && t.setAttribute("fill-opacity", s.options.fillOpacity);
  }, this.setupPolygonStyles = (s, t) => {
    if (s.options.classes && t.setAttribute("class", s.options.classes), !(!m(s.options.style) || typeof s.options.style != "object"))
      for (let e in s.options.style)
        e === "fill" && this.checkFillAttributes(s) || e === "stroke" && s.options.stroke || (t.style[e] = s.options.style[e]);
  }, this.checkFillAttributes = (s) => s.options.fillImage && typeof s.options.fillImage == "object" || s.options.fillGradient && typeof s.options.fillGradient == "object" || s.options.fill !== "none" && s.options.fill, this.toSvg = (s) => {
    const t = document.createElement("div"), e = this.getSvg(s);
    return t.appendChild(e), '<?xml version="1.0" encoding="UTF-8"?>' + t.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (s) => {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e = s.getPosition(!0);
    t.appendChild(this.getSvgDefs(s)), s.svg || this.draw(s), this.addSvgPolygons(s, t), t.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const i = "0 0 " + e.width + " " + e.height;
    return t.setAttribute("viewBox", i), t;
  }, this.getSvgDefs = (s) => {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (s.svg) {
      const e = s.svg.querySelector("defs");
      e && (t.innerHTML = e.innerHTML);
    }
    return s.getChildren(!0).forEach((e) => {
      const i = e.svg.querySelector("defs");
      i && (t.innerHTML += i.innerHTML);
    }), t;
  }, this.addSvgPolygons = (s, t) => {
    const e = s.getPosition(!0);
    if (s.svg) {
      let i = s.svg.querySelector("polygon");
      if (i) {
        i = i.cloneNode();
        const o = s.points.map(
          (n) => "" + (n.x - e.left) + "," + (n.y - e.top)
        ).join(" ");
        i.setAttribute("points", o), t.appendChild(i);
      }
    }
    s.getChildren(!0).forEach((i) => {
      let o = i.svg.querySelector("polygon");
      if (o) {
        o = o.cloneNode();
        const n = i.points.map(
          (a) => "" + (a.x - e.left) + "," + (a.y - e.top)
        ).join(" ");
        o.setAttribute("points", n), t.appendChild(o);
      }
    });
  }, this.toPng = (s, t = D.DATAURL, e = null, i = null) => new Promise(async (o) => {
    const n = s.getPosition(!0);
    [e, i] = V(e, i, n.width, n.height), s.scaleTo(e, i);
    const a = this.getSvg(s);
    for (let E of a.querySelectorAll("image"))
      if (E.getAttribute("href") && E.getAttribute("href").length) {
        const C = await k(await (await fetch(E.getAttribute("href"))).blob());
        E.setAttribute("href", C);
      }
    const c = document.createElement("div");
    c.appendChild(a);
    const l = c.innerHTML;
    s.scaleTo(n.width, n.height);
    const p = new Image(), g = new Blob([l], { type: "image/svg+xml" }), x = window.URL || window.webkitURL || window, _ = await k(g);
    p.addEventListener("load", () => {
      const E = document.createElement("canvas");
      p.width = e, p.height = i, E.width = p.width, E.height = p.height, E.getContext("2d").drawImage(p, 0, 0), x.revokeObjectURL(_);
      const M = E.toDataURL("image/png");
      if (t === D.BLOB) {
        o(K(M));
        return;
      }
      o(M);
    }), p.src = _;
  });
}
const D = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, v = new Ct();
function Mt() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(r.SHAPE_CREATE, this.onShapeCreated), h.subscribe(r.SHAPE_DESTROY, this.onShapeDestroy), h.subscribe(r.SHAPE_MOVE_START, this.onShapeMoveStart), h.subscribe(r.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), h.subscribe(u.POINT_DRAG_START, this.onPointDragStart), h.subscribe(u.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (s) => {
    this.shapes.forEach((t) => {
      h.emit(
        U.CONTAINER_BOUNDS_CHANGED,
        t,
        { bounds: t.getBounds(), points: t.points }
      );
    });
  }, this.createShape = (s, t, e) => new S().init(s, t, e), this.onShapeCreated = (s) => {
    const t = s.target;
    m(t.root) && !this.getShape(t) && (this.shapes.push(t), this.activeShape || (this.activeShape = t), this.getShapesByContainer(t.root).length === 1 && this.addContainerEvents(t));
  }, this.onShapeDestroy = (s) => {
    const t = s.target, e = t.root;
    !m(t.root) || !this.getShape(t) || (this.shapes.splice(this.shapes.indexOf(t), 1), this.getShapesByContainer(e).length === 0 && this.containerEventListeners.filter((i) => i.container === e).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
    }));
  }, this.onShapeMoveStart = (s) => {
    if (!this.getShapeByGuid(s.target.guid) || !s.target.options.managed)
      return;
    const t = s.target.getRootParent();
    t ? (this.activateShape(t), this.draggedShape = t) : (this.activateShape(s.target), this.draggedShape = s.target);
  }, this.onShapeMouseEnter = (s) => {
    !this.draggedShape || s.buttons !== 1 && (this.draggedShape.draggedPoint = null, this.draggedShape = null);
  }, this.onPointDragStart = (s) => {
    const t = this.findShapeByPoint(s.target);
    if (t) {
      this.draggedShape = t;
      const e = t.getRootParent();
      e && (this.draggedShape = e), this.draggedShape.draggedPoint = s.target, h.emit(r.POINT_DRAG_START, t, { point: s.target });
    }
  }, this.onPointDragEnd = (s) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.findShapeByPoint = (s) => {
    for (let t of this.shapes)
      if (t.isShapePoint(s))
        return t;
    return null;
  }, this.getShape = (s) => this.getShapeByGuid(s.guid), this.getShapeByGuid = (s) => this.shapes.find((t) => t.guid === s), this.getShapesByContainer = (s) => this.getShapes().filter((t) => t.root === s), this.getMaxZIndex = (s = null) => {
    let t = this.getShapes();
    return s && (t = this.getShapesByContainer(s)), t.length ? t.map((e) => e.options.zIndex || 0).reduce((e, i) => i > e ? i : e) : 0;
  }, this.getShapes = () => this.shapes.filter((s) => s.options.id.search("_resizebox") === -1 && s.options.id.search("_rotatebox") === -1), this.activateShape = (s, t = null) => {
    if (this.activeShape === s) {
      this.activeShape.switchDisplayMode(t);
      return;
    }
    if (typeof s.id < "u" && (s.id.search("_resizebox") !== -1 || s.id.search("_rotatebox") !== -1))
      return;
    this.activeShape && this.deactivateShape(this.activeShape);
    const i = this.getMaxZIndex(s.root) + 1 - s.options.zIndex;
    s.options.prevZIndex = s.options.zIndex, s.options.zIndex += i, v.updateOptions(s), s.getChildren(!0).forEach((o) => {
      o.options.prevZIndex = o.options.zIndex, o.options.zIndex += i, v.updateOptions(o);
    }), this.activeShape = s, this.activeShape.switchDisplayMode(t);
  }, this.deactivateShape = (s) => {
    typeof s.options.prevZIndex < "u" && v.updateOptions(s), s.options.displayMode !== A.DEFAULT && s.switchDisplayMode(A.DEFAULT), s.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (v.updateOptions(t), t.options.displayMode !== A.DEFAULT && t.switchDisplayMode(A.DEFAULT));
    });
  }, this.addContainerEvents = (s) => {
    this.addContainerEvent(s.root, "mousemove", this.mousemove), this.addContainerEvent(s.root, "mouseup", this.mouseup, s.options.id), this.addContainerEvent(s.root, "dblclick", this.doubleclick), h.emit(Pt.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, s.root);
  }, this.addContainerEvent = (s, t, e) => {
    this.containerEventListeners.find((i) => i.container === s && i.name === t) || (s.addEventListener(t, e), this.containerEventListeners.push({ id: s.id, container: s, name: t, listener: e }));
  }, this.doubleclick = (s) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(d(s, { target: this.shapeOnCursor }));
    try {
      s.stopPropagation();
    } catch {
    }
    if (!!this.activeShape && !(!this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2) && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints)) {
      this.activeShape.options.displayMode === A.DEFAULT && this.activeShape.switchDisplayMode(A.SELECTED);
      const [t, e] = H(d(s, { target: this.activeShape }));
      this.activeShape.addPoint(t, e, { forceDisplay: !1 });
    }
  }, this.mousedown = (s) => {
    if (this.shapeOnCursor && s.buttons !== 2) {
      const t = this.shapeOnCursor.getRootParent();
      t && (this.shapeOnCursor = t), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(d(s, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (s) => {
    if (!this.draggedShape)
      return;
    const t = this.draggedShape;
    s.buttons === 1 && t.options.canAddPoints && !t.draggedPoint && (t.options.maxPoints === -1 || t.points.length < t.options.maxPoints) && t.addPoint(
      s.clientX - t.root.offsetLeft,
      s.clientY - t.root.offsetTop
    ), t.draggedPoint ? (h.emit(r.POINT_DRAG_END, this.draggedShape, { point: t.draggedPoint }), t.draggedPoint.mouseup(s), t.draggedPoint = null) : h.emit(r.SHAPE_MOUSE_UP, t, {}), this.draggedShape = null, h.emit(r.SHAPE_MOVE_END, t, { pos: t.getPosition(!0) });
  }, this.mousemove = (s) => {
    if (s.buttons !== 1 && (this.draggedShape = null), this.draggedShape) {
      if (s.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(s);
    } else
      this.processShapesUnderCursor(s);
  }, this.mouseover = (s) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(d(s, { target: this.shapeOnCursor }));
  }, this.mouseenter = (s) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(d(s, { target: this.shapeOnCursor }));
  }, this.mouseout = (s) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(d(s, { target: s.target }));
  }, this.click = (s) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(d(s, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (s) => {
    const [t, e] = [s.clientX, s.clientY], i = this.getShapeOnCursor(t, e);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(d(s, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(d(s, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (h.emit(r.SHAPE_MOUSE_MOVE, this.shapeOnCursor, d(s)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (s, t) => {
    const e = this.shapes.filter((i) => i.belongsToShape(s, t) && i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1);
    return e.length ? e.reduce((i, o) => o.options.zIndex >= i.options.zIndex ? o : i) : null;
  }, this.toJSON = (s = null) => (s || (s = this.shapes), s = s.filter((t) => t.options.id.search("_resizebox") === -1 && t.options.id.search("_rotatabox") === -1 && !t.getParent()), JSON.stringify(s.map((t) => t.getJSON()), null, 4)), this.fromJSON = (s, t) => {
    let e = t;
    if (typeof e == "string" && (e = N(t)), !e)
      return null;
    const i = [];
    for (let o of e)
      o.options.id && this.findShapeById(o.options.id) || i.push(new S().fromJSON(s, o));
    return i;
  }, this.findShapesByOptionValue = (s, t) => this.shapes.filter((e) => e.options[s] === t), this.findShapeById = (s) => {
    const t = this.findShapesByOptionValue("id", s);
    return t && t.length ? t[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: s, name: t, listener: e }) => {
      try {
        s.removeEventListener(t, e);
      } catch (i) {
        console.error(i);
      }
    }), this.containerEventListeners = []; this.shapes.length; )
      this.shapes[0].destroy();
  };
}
const Pt = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, U = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, b = new Mt().init();
function wt(s) {
  this.shape = s, this.children = [], this.parent = {}, this.init = () => {
    for (let t in this)
      typeof this[t] != "function" || t === "init" || (typeof this.shape[t] == "function" && (this.parent[t] = this.shape[t]), this.shape[t] = this[t]);
    return this;
  }, this.addChild = (t) => {
    !this.shouldAddChild(t) || this.children.push(t);
  }, this.removeChild = (t) => {
    this.children.splice(this.children.indexOf(t), 1);
  }, this.getChildren = (t = !1) => {
    if (!t)
      return this.children;
    const e = [];
    e.push(...this.children);
    for (let i of e)
      e.push(...i.getChildren());
    return e;
  }, this.shouldAddChild = (t) => !t || typeof t != "object" || typeof t.getChildren > "u" || this.children.indexOf(t) !== -1 ? !1 : t === this.shape ? void 0 : t.getChildren().indexOf(this.shape) !== -1 || t.getParent() ? !1 : this.getParentsList().indexOf(t) === -1, this.getParent = () => {
    const t = b.shapes;
    for (let e of t)
      if (e.getChildren().indexOf(this.shape) !== -1)
        return e;
    return null;
  }, this.getRootParent = () => {
    const t = this.getParentsList();
    return t.length ? t[t.length - 1] : null;
  }, this.getParentsList = (t = []) => {
    const e = this.getParent();
    return e == null ? t : (t.push(e), e.getParentsList(t));
  }, this.getPosition = (t = !1) => {
    const e = this.parent.getPosition();
    if (!t)
      return e;
    let i = this.getChildren(!0);
    return i.push(this.shape), i = i.filter((o) => o.points.length), i.length && (e.left = i.map((o) => o.left).reduce((o, n) => n < o ? n : o), e.top = i.map((o) => o.top).reduce((o, n) => n < o ? n : o), e.right = i.map((o) => o.right).reduce((o, n) => n > o ? n : o), e.bottom = i.map((o) => o.bottom).reduce((o, n) => n > o ? n : o), e.width = e.right - e.left || 1, e.height = e.bottom - e.top || 1), e;
  };
}
function W() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = R(), this.options = {
    id: "",
    shapeOptions: {
      id: "",
      canAddPoints: !1,
      canDeletePoints: !1,
      stroke: "#aaaaaa",
      strokeWidth: 1,
      strokeDasharray: "10",
      pointOptions: {
        style: {
          borderWidth: "0px",
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0)"
        },
        width: 13,
        height: 13,
        forceDisplay: !0
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (s, t, e, i, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(e), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new S().init(s, Object.assign({}, this.options.shapeOptions), []), h.emit(r.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new yt(this).run(), this.redraw(), h.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (s = {}) => {
    !s || typeof s != "object" || (s.shapeOptions && typeof s.shapeOptions == "object" ? (s.shapeOptions.pointOptions && typeof s.shapeOptions.pointOptions == "object" ? s.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, s.shapeOptions.pointOptions) : s.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), s.shapeOptions = Object.assign(this.options.shapeOptions, s.shapeOptions)) : s.shapeOptions = Object.assign({}, this.options.shapeOptions), s.shapeOptions.zIndex = s.zIndex || this.options.zIndex, s.shapeOptions.id = s.id ? s.id : this.options.id, Object.assign(this.options, s), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + nt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + ht + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + rt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + at + "')" } });
  }, this.adjustCoordinates = () => {
    this.right = this.left + this.width, this.bottom = this.top + this.height, this.left_top.x = this.left, this.left_top.y = this.top, this.right_top.x = this.right, this.right_top.y = this.top, this.left_bottom.x = this.left, this.left_bottom.y = this.bottom, this.right_bottom.x = this.right, this.right_bottom.y = this.bottom;
  }, this.calcPosition = () => {
    this.shape.calcPosition(), this.left = this.shape.left, this.top = this.shape.top, this.bottom = this.shape.bottom, this.right = this.shape.right, this.width = this.shape.width, this.height = this.shape.height;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.redraw = () => {
    this.adjustCoordinates(), this.shape.setOptions(this.options.shapeOptions), this.shape.redraw();
  }, this.show = () => {
    this.options.shapeOptions.visible = !0, this.shape.show();
  }, this.hide = () => {
    this.options.shapeOptions.visible = !1, this.shape.hide();
  }, this.destroy = () => {
    h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (s, t) => this.eventListener.addEventListener(s, t), this.removeEventListener = (s, t) => {
    this.eventListener.removeEventListener(s, t);
  };
}
function Tt(s) {
  this.shape = s, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), s.options.hasContextMenu && this.init(), this.shape.contextMenu = this.contextMenu;
  }, this.init = () => {
    s.svg && (this.contextMenu = z.create([
      { id: "i" + s.guid + "_clone", title: "Clone", image: Ot },
      { id: "i" + s.guid + "_export_json", title: "Export to JSON", image: mt },
      { id: "i" + s.guid + "_export_svg", title: "Export to SVG", image: bt },
      { id: "i" + s.guid + "_export_png", title: "Export to PNG", image: xt },
      { id: "i" + s.guid + "_destroy", title: "Destroy", image: F }
    ], s.svg), s.options.canAddPoints && this.contextMenu.addItem("i" + s.guid + "_add_point", "Add Point", Et), this.setEventListeners());
  }, this.setEventListeners = () => {
    this.contextMenu.on("click", (t) => {
      switch (t.itemId) {
        case "i" + s.guid + "_destroy":
          this.shape.destroy();
          break;
        case "i" + s.guid + "_add_point":
          this.onAddPointClick(t);
          break;
        case "i" + s.guid + "_clone":
          this.onCloneClick(t);
          break;
        case "i" + s.guid + "_export_json":
          this.onExportJsonClick(t);
          break;
        case "i" + s.guid + "_export_svg":
          this.onExportSvgClick(t);
          break;
        case "i" + s.guid + "_export_png":
          this.onExportPngClick(t);
          break;
      }
    });
  }, this.onAddPointClick = (t) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [e, i] = j(this.shape.root, t.cursorX, t.cursorY);
    this.shape.addPoint(e, i), this.shape.options.displayMode === A.DEFAULT && this.shape.switchDisplayMode(A.SELECTED);
  }, this.onCloneClick = (t) => {
    const e = this.shape.clone(), i = e.getPosition(!0);
    e.moveTo(i.left + 5, i.top + 5);
  }, this.onExportJsonClick = (t) => {
    const e = this.shape.toJSON(!0), i = new Blob([e]);
    this.saveToFile(i, this.getExportFileName("json"));
  }, this.onExportSvgClick = (t) => {
    const e = this.shape.toSvg(), i = new Blob([e]);
    this.saveToFile(i, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (t) => {
    const e = await this.shape.toPng(D.BLOB);
    this.saveToFile(e, this.getExportFileName("png"));
  }, this.saveToFile = (t, e) => {
    const i = window.URL.createObjectURL(t), o = document.createElement("a");
    o.download = e, o.href = i, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(i);
  }, this.getExportFileName = (t) => (this.shape.options.id ? this.shape.options.id : "shape") + "." + t;
}
function S() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.eventListener = new _t(this), this.options = {
    id: "",
    name: "Unnamed shape",
    maxPoints: -1,
    stroke: "",
    strokeWidth: "",
    strokeLinecap: "",
    strokeDasharray: "",
    fill: "",
    fillGradient: null,
    fillImage: null,
    fillOpacity: "1",
    filters: {},
    canDragShape: !0,
    canAddPoints: !1,
    canScale: !1,
    canRotate: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {
      "stroke-width": 2,
      stroke: "black",
      fill: "none"
    },
    pointOptions: {},
    zIndex: 1e3,
    bounds: { left: -1, top: -1, right: -1, bottom: -1 },
    visible: !0,
    displayMode: A.DEFAULT,
    managed: !0,
    minWidth: -1,
    minHeight: -1,
    maxWidth: -1,
    maxHeight: -1,
    hasContextMenu: !0,
    minPoints: 3
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = R(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (s, t = null, e = null) => {
    if (!s) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (b.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = s, this.root.style.position = "relative", Object.assign(this, new Tt(this)), this.setOptions(t), this.groupHelper = new wt(this).init(), e && e.length && this.setupPoints(e, Object.assign({}, this.options.pointOptions)), this.eventListener.run(), this.applyDisplayMode(), (e && e.length || this.options.forceCreateEvent) && h.emit(r.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (s) => {
    !s || typeof s != "object" || (s.pointOptions = y(this.options.pointOptions, s.pointOptions), s.style = y(this.options.style, s.style), s.bounds = y(this.options.bounds, s.bounds), m(s.visible) && s.visible !== this.options.visible && (this.points.forEach((t) => t.options.visible = s.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: s.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: s.visible } })), this.options = y(this.options, s), this.points.forEach((t) => {
      t.setOptions(y({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }), typeof this.updateContextMenu == "function" && this.updateContextMenu());
  }, this.setupPoints = (s, t) => {
    this.points = [], this.addPoints(s, Object.assign({}, t));
  }, this.addPoint = (s, t, e = null) => {
    const i = this.putPoint(s, t, Object.assign({}, e));
    return this.redraw(), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu(), i;
  }, this.addPoints = (s, t = null) => {
    !s || typeof s != "object" || (s.forEach(
      (e) => this.putPoint(e[0] + this.options.offsetX, e[1] + this.options.offsetY, Object.assign({}, t))
    ), this.redraw(), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu());
  }, this.putPoint = (s, t, e = null) => {
    if (this.findPoint(s, t))
      return null;
    !e || !Object.keys(e).length ? e = Object.assign({}, this.options.pointOptions) || {} : e = y(Object.assign({}, this.options.pointOptions), e), e.bounds = this.getBounds(), e.zIndex = this.options.zIndex + 1;
    const i = new St();
    return this.points.push(i), i.init(s, t, e), this.root.appendChild(i.element), i;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (s, t) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
    const e = this.findPoint(s, t);
    e && e.destroy();
  }, this.findPoint = (s, t) => {
    const e = this.points.find((i) => i.x === s && i.y === t);
    return typeof e > "u" || !e ? null : e;
  }, this.findPointById = (s) => {
    const t = this.points.find((e) => e.options.id === s);
    return typeof t > "u" || !t ? null : t;
  }, this.getPointsArray = () => {
    let s = [];
    return this.points && typeof this.points == "object" && this.points.length && (s = this.points.map((t) => [t.x, t.y])), s;
  }, this.moveTo = (s, t, e = !0) => {
    const i = this.getBounds(), o = this.getPosition(!0);
    let n = s + o.width > i.right ? i.right - o.width : s, a = t + o.height > i.bottom ? i.bottom - o.height : t;
    this.moveBy(n - o.left, a - o.top, e), this.calcPosition();
  }, this.moveBy = (s, t, e = !0) => {
    for (let o in this.points)
      this.points[o].x += s, this.points[o].y += t, e && this.points[o].redraw();
    this.calcPosition();
    const i = this.getChildren();
    e && this.redraw(), i.length && i.forEach((o) => {
      o.moveBy(s, t, e);
    });
  }, this.scaleTo = (s = null, t = null) => {
    const e = this.getBounds();
    if (this.calcPosition(), !s && !t)
      return null;
    const i = this.getPosition(!0);
    [s, t] = this.applyScaleRestriction(...V(s, t, i.width, i.height)), i.width >= 10 && s < 10 && (s = 10), i.height >= 10 && t < 10 && (t = 10);
    let o = i.left + s > e.right && e.right !== -1 ? e.right - i.left : s, n = i.top + t > e.bottom && e.bottom !== -1 ? e.bottom - i.top : t, a = o / i.width, c = n / i.height;
    this.points.forEach(
      (l) => {
        l.x = (l.x - i.left) * a + i.left, l.y = (l.y - i.top) * c + i.top;
      }
    ), this.getChildren(!0).forEach((l) => {
      l.points.forEach(
        (p) => {
          p.x = (p.x - i.left) * a + i.left, p.y = (p.y - i.top) * c + i.top;
        }
      ), l.calcPosition();
    }), this.getChildren(!0).forEach((l) => l.redraw()), this.calcPosition();
  }, this.applyScaleRestriction = (s, t) => (this.options.minWidth !== -1 && s < this.options.minWidth && (s = this.options.minWidth), this.options.minWidth !== -1 && t < this.options.minHeight && (t = this.options.minHeight), this.options.minWidth !== -1 && s > this.options.maxWidth && (s = this.options.maxWidth), this.options.minWidth !== -1 && t > this.options.maxHeight && (t = this.options.maxHeight), [s, t]), this.rotateBy = (s, t = null, e = null, i = !1) => {
    this.calcPosition();
    const o = this.getPosition(!0);
    let [n, a] = this.getCenter(!0);
    const c = this.getRootParent();
    c && ([n, a] = c.getCenter(!0)), t || (t = n), e || (e = a), this.initCenter && ([t, e] = this.initCenter), !(i && (!this.isInBounds(...w(s, o.left, o.top, t, e)) || !this.isInBounds(...w(s, o.right, o.top, t, e)) || !this.isInBounds(...w(s, o.left, o.bottom, t, e)) || !this.isInBounds(...w(s, o.right, o.bottom, t, e)))) && (this.points.forEach((l) => l.rotateBy(s, t, e)), this.getChildren(!0).forEach((l) => {
      l.points.forEach((p) => p.rotateBy(s, t, e)), l.redraw();
    }));
  }, this.isInBounds = (s, t) => {
    const [e, i] = this.getMaxPointSize(), o = this.getBounds();
    return s >= o.left + e / 2 && s <= o.right - e / 2 && t >= o.top + i / 2 && t <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), v.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === A.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === A.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((s) => {
      s.setOptions({ zIndex: this.options.zIndex + 1 }), s.element.style.zIndex = s.options.zIndex, this.options.displayMode === A.DEFAULT && !s.options.forceDisplay && (s.element.style.display = "none");
    }), this.options.displayMode !== "DEFAULT" && this.getChildren(!0).forEach((s) => {
      s.points.forEach((t) => {
        t.element.style.display = "";
      });
    });
  }, this.switchDisplayMode = (s = null) => {
    s || (s = this.getNextDisplayMode()), (s === A.SCALE && !this.options.canScale || s === A.ROTATE && !this.options.canRotate || s === A.SELECTED && this.points.length && !this.points.filter((t) => t.options.canDrag).length) && (s = A.DEFAULT), this.options.displayMode = s, this.redraw();
  }, this.getNextDisplayMode = () => {
    let s;
    return this.options.displayMode === A.DEFAULT ? s = A.SELECTED : this.options.displayMode === A.SELECTED ? s = A.SCALE : this.options.displayMode === A.SCALE ? s = A.ROTATE : s = A.DEFAULT, s === A.SELECTED && !this.points.filter((t) => t.options.canDrag).length && (s = A.SCALE), s === A.SCALE && !this.options.canScale && (s = A.ROTATE), s === A.ROTATE && !this.options.canRotate && (s = A.DEFAULT), s;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((s) => s.x).reduce((s, t) => t < s ? t : s), this.top = this.points.map((s) => s.y).reduce((s, t) => t < s ? t : s), this.right = this.points.map((s) => s.x).reduce((s, t) => t > s ? t : s), this.bottom = this.points.map((s) => s.y).reduce((s, t) => t > s ? t : s), this.width = parseInt(this.right - this.left) || 1, this.height = parseInt(this.bottom - this.top) || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height: parseInt(this.height) }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === "none" ? -1 : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === "none" ? -1 : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === "none" ? -1 : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === "none" ? -1 : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (s) => !!this.points.find((t) => t === s), this.belongsToShape = (s, t, e = !0) => {
    if (this.findPoint(s, t))
      return !0;
    let i = this.getPointsArray();
    return e && (i = i.map((o) => [o[0] + I(this.root).left, o[1] + I(this.root).top])), X(i, [s, t]);
  }, this.addEventListener = (s, t) => this.eventListener.addEventListener(s, t), this.removeEventListener = (s, t) => {
    this.eventListener.removeEventListener(s, t);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.getChildren(!0).forEach((s) => s.destroy()), this.contextMenu && this.contextMenu.destroy();
  }, this.setupResizeBox = () => {
    if (!this.points.length)
      return null;
    const s = this.getResizeBoxBounds();
    return this.resizeBox = new Y().init(this.root, s.left, s.top, s.width, s.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.calcPosition(), this.eventListener.addResizeEventListener(), this.resizeBox.redraw(), this.resizeBox;
  }, this.setupRotateBox = () => {
    if (!this.points.length)
      return null;
    const s = this.getResizeBoxBounds();
    return this.rotateBox = new W().init(this.root, s.left, s.top, s.width, s.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_rotatebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.calcPosition(), this.eventListener.addRotateEventListener(), this.rotateBox.redraw(), this.rotateBox;
  }, this.getResizeBoxBounds = () => {
    this.calcPosition();
    let s = this.getPosition(!0);
    const t = this.getRootParent();
    t && (t.calcPosition(), s = t.getPosition(!0));
    const [e, i] = this.getMaxPointSize(), o = {
      left: s.left - e,
      right: s.right + e,
      top: s.top - i,
      bottom: s.bottom + i,
      width: s.width + e * 2,
      height: s.height + i * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, s.top, !1), o.left = 0), o.top < 0 && (this.moveTo(s.left, o.top * -1, !1), o.top = 0);
    const n = this.getBounds();
    return o.bottom > n.bottom && (this.moveTo(s.left, o.bottom - n.bottom + s.top, !1), o.bottom = n.bottom), o.right > n.right && (this.moveTo(o.right - n.right + s.left, s.top, !1), o.bottom = n.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const s = this.points.map((e) => e.options.width).reduce((e, i) => Math.max(e, i)), t = this.points.map((e) => e.options.height).reduce((e, i) => Math.max(e, i));
    return [s, t];
  }, this.getCenter = (s = !1) => {
    const t = this.getPosition(s);
    return [t.left + t.width / 2, t.top + t.height / 2];
  }, this.toSvg = () => v.toSvg(this), this.toPng = (s = D.DATAURL, t = null, e = null) => v.toPng(this, s, t, e), this.toJSON = (s = !0) => JSON.stringify(this.getJSON(s)), this.clone = () => {
    const s = Object.assign({}, this.getJSON());
    s.options.id += "_clone", s.options.name += " Clone";
    const t = new S().fromJSON(this.root, JSON.stringify(s));
    return t ? (t.getChildren(!0).forEach((e) => {
      e.options.id += "_clone", e.options.name += " Clone";
    }), t) : null;
  }, this.getJSON = (s = !0) => {
    const t = {
      options: Object.assign({}, this.options)
    };
    if (t.options.displayMode = A.DEFAULT, t.points = this.points.map((e) => e.getJSON()), s) {
      let e = this.getChildren();
      e.length && (t.children = e.map((i) => i.getJSON(s)));
    }
    return t;
  }, this.fromJSON = (s, t, e = !0) => {
    let i = t;
    return typeof i == "string" && (i = N(t)), i ? (this.root = s, this.setOptions(i.options), this.svg || this.init(s, this.options, null), i.points.forEach((o) => {
      this.addPoint(o.x, o.y, o.options);
    }), e && typeof i.children < "u" && i.children && (this.getChildren(!0).forEach((o) => o.destroy()), i.children.forEach((o) => {
      this.addChild(new S().fromJSON(s, o));
    })), h.emit(r.SHAPE_CREATE, this, {}), this) : null;
  };
}
const A = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function Y() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = R(), this.options = {
    id: "",
    shapeOptions: {
      id: "",
      canAddPoints: !1,
      canDeletePoints: !1,
      stroke: "#aaaaaa",
      strokeWidth: 1,
      strokeDasharray: "10",
      pointOptions: {
        style: {
          borderWidth: "0px",
          borderRadius: "0px",
          backgroundColor: "rgba(0,0,0,0)",
          cursor: "pointer"
        },
        forceDisplay: !0,
        width: 13,
        height: 13
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (s, t, e, i, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(e), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new S().init(s, Object.assign({}, this.options.shapeOptions), []), h.emit(r.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Bt(this).run(), this.redraw(), h.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (s = {}) => {
    !s || typeof s != "object" || (s.shapeOptions && typeof s.shapeOptions == "object" ? (s.shapeOptions.pointOptions && typeof s.shapeOptions.pointOptions == "object" ? s.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, s.shapeOptions.pointOptions) : s.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), s.shapeOptions = Object.assign(this.options.shapeOptions, s.shapeOptions)) : s.shapeOptions = Object.assign({}, this.options.shapeOptions), s.shapeOptions.zIndex = s.zIndex || this.options.zIndex, s.shapeOptions.id = s.id ? s.id : this.options.id, Object.assign(this.options, s), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + At + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + pt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + ft + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + gt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + ct + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + lt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + dt + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + ut + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [f.TOP, f.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [f.TOP, f.BOTTOM] }), this.left_center.setOptions({ moveDirections: [f.LEFT, f.RIGHT] }), this.right_center.setOptions({ moveDirections: [f.LEFT, f.RIGHT] });
  }, this.setPointsMoveBounds = () => {
    this.left_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.left_top.options.bounds.right = this.right_top.x - this.right_top.options.width - this.center_top.options.width, this.center_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.left = this.left_top.x + this.right_top.options.width + this.center_top.options.width, this.right_center.options.bounds.left = this.left_top.x + this.right_center.options.width + this.center_top.options.width, this.right_bottom.options.bounds.left = this.left_top.x + this.right_bottom.options.width + this.center_bottom.options.width, this.right_bottom.options.bounds.top = this.right_top.y + this.right_top.options.height + this.right_center.options.height, this.center_bottom.options.bounds.top = this.center_top.y + this.center_top.options.height + this.right_center.options.height, this.left_bottom.options.bounds.right = this.right_bottom.x - this.right_bottom.options.width - this.center_bottom.options.width, this.left_bottom.options.bounds.top = this.left_top.y + this.left_top.options.height + this.left_center.options.height, this.left_center.options.bounds.right = this.right_center.x - this.right_center.options.width - this.center_top.options.width;
  }, this.adjustCoordinates = () => {
    this.right = this.left + this.width, this.bottom = this.top + this.height, this.left_top.x = this.left, this.left_top.y = this.top, this.right_top.x = this.right, this.right_top.y = this.top, this.left_bottom.x = this.left, this.left_bottom.y = this.bottom, this.right_bottom.x = this.right, this.right_bottom.y = this.bottom, this.center_top.y = this.top, this.center_bottom.y = this.bottom, this.left_center.x = this.left, this.right_center.x = this.right, this.adjustCenters();
  }, this.adjustCenters = () => {
    this.center_top.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.center_bottom.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.left_center.y = parseInt(this.left_top.y + (this.left_bottom.y - this.left_top.y) / 2), this.right_center.y = parseInt(this.right_top.y + (this.right_bottom.y - this.right_top.y) / 2);
  }, this.calcPosition = () => {
    this.shape.calcPosition(), this.left = this.shape.left, this.top = this.shape.top, this.bottom = this.shape.bottom, this.right = this.shape.right, this.width = this.shape.width, this.height = this.shape.height;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.redraw = () => {
    this.adjustCoordinates(), this.shape.setOptions(this.options.shapeOptions), this.setPointsMoveBounds(), this.shape.redraw();
  }, this.show = () => {
    this.options.shapeOptions.visible = !0, this.shape.show();
  }, this.hide = () => {
    this.options.shapeOptions.visible = !1, this.shape.hide();
  }, this.destroy = () => {
    h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (s, t) => this.eventListener.addEventListener(s, t), this.removeEventListener = (s, t) => {
    this.eventListener.removeEventListener(s, t);
  };
}
try {
  window.ResizeBox = Y, window.SmartShape = S, window.RotateBox = W, window.SmartShapeManager = b;
} catch {
}
export {
  h as EventsManager,
  Y as ResizeBox,
  W as RotateBox,
  r as ShapeEvents,
  S as SmartShape,
  A as SmartShapeDisplayMode,
  b as SmartShapeManager
};
