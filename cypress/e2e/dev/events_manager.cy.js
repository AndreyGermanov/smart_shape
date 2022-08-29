import EventsManager from "../../../src/events/EventsManager.js"
describe('EventsManager tests', () => {
  it('subscribe', () => {
    EventsManager.subscriptions = {};
    const handler = (event) => {};
    const h1 = EventsManager.subscribe("event1",handler);
    assert.equal(h1, handler,"Should return pointer to event handler that stored to events manager");
    assert.equal(EventsManager.subscriptions["event1"].length,1,"Should add new handler properly");
    const h2 = EventsManager.subscribe("event1",handler);
    assert.isNull(h2,"Should return null if event handler haven't stored to events manager");
    assert.equal(EventsManager.subscriptions["event1"].length,1,"Should not add the same handler for the same event twice");
    const h3 = EventsManager.subscribe("event2",handler);
    assert.equal(h3, handler,"Should return pointer to event handler that stored to events manager");
    assert.equal(EventsManager.subscriptions["event1"].length,1,"Should correctly place events to the array");
    assert.equal(EventsManager.subscriptions['event2'].length,1,"Should correctly place events to the array");
  });

  it("emit", () => {
    EventsManager.subscriptions = {};
    let event1Passes = 0;
    let event2Passes = 0;

    let obj1 = null;
    let obj2 = null;

    function Class1 () {
      this.event1handler = (event) => {
        assert.equal(event.type,"event1", "Should pass correct event type to handler");
        assert.equal(event.target,obj2,"Should pass correct pointer to the sender object to handler");
        assert.equal(event.param1,"param1","Should pass some arguments to handler");
        event1Passes += 1;
      }
    }

    function Class2 () {
      this.event1Handler = (event) => {
        assert.equal(event.type,"event1", "Should pass correct event type to handler");
        assert.equal(event.target,this,"Should pass correct pointer to the sender object to handler");
        assert.equal(event.param1,"param1","Should pass some arguments to handler");
        event1Passes += 1;
      }
      this.event2Handler = (event) => {
        assert.equal(event.type,"event2", "Should pass correct event type to handler");
        assert.equal(event.target,obj1,"Should pass correct pointer to the sender object to handler");
        assert.equal(event.param2,"param2","Should pass some arguments to handler");
        event2Passes += 1;
      }
    }

    obj1 = new Class1();
    obj2 = new Class2();

    EventsManager.subscribe("event1",obj1.event1handler);
    EventsManager.subscribe("event1",obj2.event1Handler);
    EventsManager.subscribe("event2",obj2.event2Handler);

    EventsManager.emit("event1",obj2,{param1:"param1"});
    EventsManager.emit("event2",obj1,{param2:"param2"});
    assert.equal(event1Passes,2, "Should correctly call all handlers for the same event");
    assert.equal(event2Passes,1, "Should correctly call all handlers for the same event");
    EventsManager.emit("event3",obj2);
  })

  it("unsubscribe", () => {
    EventsManager.subscriptions = {};
    let event1Passes = 0;

    let obj1 = null;
    let obj2 = null;

    function Class3 () {
      this.event1handler = (event) => {
        if (typeof(event) === "function") {
          return
        }
        assert.equal(event.type,"event1", "Should pass correct event type to handler");
        assert.equal(event.target,obj2,"Should pass correct pointer to the sender object to handler");
        assert.equal(event.param1,"param1","Should pass some arguments to handler");
        event1Passes += 1;
      }
    }

    function Class4 () {
    }

    obj1 = new Class3();
    obj2 = new Class4();

    const handler = EventsManager.subscribe("event1",obj1.event1handler);
    assert.equal(EventsManager.subscriptions["event1"].length,1,"Should add event handler to the manager");
    EventsManager.emit("event1",obj2,{param1:"param1"});
    assert.equal(event1Passes,1,"Should correctly call the handler");
    EventsManager.unsubscribe("event1",handler);
    assert.equal(EventsManager.subscriptions["event1"].length,0,"Should remove event handler from the manager");
    EventsManager.emit("event1",obj2,{param1:"param1"});
    assert.equal(event1Passes,1,"Should not call the handler after it unsubscribed");
  })

  it("clear", () => {
    EventsManager.subscriptions = {};
    let event1Passes = 0;
    let event2Passes = 0;

    let obj1 = null;
    let obj2 = null;

    function Class5 () {
      this.event1handler = (event) => {
        event1Passes += 1;
      }
    }

    function Class6 () {
      this.event1Handler = (event) => {
        event1Passes += 1;
      }
      this.event2Handler = (event) => {
        event2Passes += 1;
      }
    }

    obj1 = new Class5();
    obj2 = new Class6();

    EventsManager.subscribe("event1",obj1.event1handler);
    EventsManager.subscribe("event1",obj2.event1Handler);
    EventsManager.subscribe("event2",obj2.event2Handler);
    EventsManager.clear();
    EventsManager.emit("event1",obj2,{param1:"param1"});
    EventsManager.emit("event2",obj1,{param2:"param2"});
    assert.equal(event1Passes,0, "Should not trigger any handlers if EventManager is cleared");
    assert.equal(event2Passes,0, "Should not trigger any handlers if EventManager is cleared");
    EventsManager.emit("event3",obj2);
  })
})
