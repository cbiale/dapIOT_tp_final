
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function (L) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) { return e; } else {
            var n = Object.create(null);
            if (e) {
                Object.keys(e).forEach(function (k) {
                    if (k !== 'default') {
                        var d = Object.getOwnPropertyDescriptor(e, k);
                        Object.defineProperty(n, k, d.get ? d : {
                            enumerable: true,
                            get: function () {
                                return e[k];
                            }
                        });
                    }
                });
            }
            n['default'] = e;
            return Object.freeze(n);
        }
    }

    var L__namespace = /*#__PURE__*/_interopNamespace(L);

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_options(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            option.selected = ~value.indexOf(option.__value);
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, basedir, module) {
    	return module = {
    	  path: basedir,
    	  exports: {},
    	  require: function (path, base) {
          return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
        }
    	}, fn(module, module.exports), module.exports;
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    var page = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
    	 module.exports = factory() ;
    }(commonjsGlobal, (function () {
    var isarray = Array.isArray || function (arr) {
      return Object.prototype.toString.call(arr) == '[object Array]';
    };

    /**
     * Expose `pathToRegexp`.
     */
    var pathToRegexp_1 = pathToRegexp;
    var parse_1 = parse;
    var compile_1 = compile;
    var tokensToFunction_1 = tokensToFunction;
    var tokensToRegExp_1 = tokensToRegExp;

    /**
     * The main path matching regexp utility.
     *
     * @type {RegExp}
     */
    var PATH_REGEXP = new RegExp([
      // Match escaped characters that would otherwise appear in future matches.
      // This allows the user to escape special characters that won't transform.
      '(\\\\.)',
      // Match Express-style parameters and un-named parameters with a prefix
      // and optional suffixes. Matches appear as:
      //
      // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
      // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
      // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
      '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
    ].join('|'), 'g');

    /**
     * Parse a string for the raw tokens.
     *
     * @param  {String} str
     * @return {Array}
     */
    function parse (str) {
      var tokens = [];
      var key = 0;
      var index = 0;
      var path = '';
      var res;

      while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;

        // Ignore already escaped sequences.
        if (escaped) {
          path += escaped[1];
          continue
        }

        // Push the current path onto the tokens.
        if (path) {
          tokens.push(path);
          path = '';
        }

        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var suffix = res[6];
        var asterisk = res[7];

        var repeat = suffix === '+' || suffix === '*';
        var optional = suffix === '?' || suffix === '*';
        var delimiter = prefix || '/';
        var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

        tokens.push({
          name: name || key++,
          prefix: prefix || '',
          delimiter: delimiter,
          optional: optional,
          repeat: repeat,
          pattern: escapeGroup(pattern)
        });
      }

      // Match any characters still remaining.
      if (index < str.length) {
        path += str.substr(index);
      }

      // If the path exists, push it onto the end.
      if (path) {
        tokens.push(path);
      }

      return tokens
    }

    /**
     * Compile a string to a template function for the path.
     *
     * @param  {String}   str
     * @return {Function}
     */
    function compile (str) {
      return tokensToFunction(parse(str))
    }

    /**
     * Expose a method for transforming tokens into the path function.
     */
    function tokensToFunction (tokens) {
      // Compile all the tokens into regexps.
      var matches = new Array(tokens.length);

      // Compile all the patterns before compilation.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === 'object') {
          matches[i] = new RegExp('^' + tokens[i].pattern + '$');
        }
      }

      return function (obj) {
        var path = '';
        var data = obj || {};

        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === 'string') {
            path += token;

            continue
          }

          var value = data[token.name];
          var segment;

          if (value == null) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to be defined')
            }
          }

          if (isarray(value)) {
            if (!token.repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
            }

            if (value.length === 0) {
              if (token.optional) {
                continue
              } else {
                throw new TypeError('Expected "' + token.name + '" to not be empty')
              }
            }

            for (var j = 0; j < value.length; j++) {
              segment = encodeURIComponent(value[j]);

              if (!matches[i].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
              }

              path += (j === 0 ? token.prefix : token.delimiter) + segment;
            }

            continue
          }

          segment = encodeURIComponent(value);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += token.prefix + segment;
        }

        return path
      }
    }

    /**
     * Escape a regular expression string.
     *
     * @param  {String} str
     * @return {String}
     */
    function escapeString (str) {
      return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
    }

    /**
     * Escape the capturing group by escaping special characters and meaning.
     *
     * @param  {String} group
     * @return {String}
     */
    function escapeGroup (group) {
      return group.replace(/([=!:$\/()])/g, '\\$1')
    }

    /**
     * Attach the keys as a property of the regexp.
     *
     * @param  {RegExp} re
     * @param  {Array}  keys
     * @return {RegExp}
     */
    function attachKeys (re, keys) {
      re.keys = keys;
      return re
    }

    /**
     * Get the flags for a regexp from the options.
     *
     * @param  {Object} options
     * @return {String}
     */
    function flags (options) {
      return options.sensitive ? '' : 'i'
    }

    /**
     * Pull out keys from a regexp.
     *
     * @param  {RegExp} path
     * @param  {Array}  keys
     * @return {RegExp}
     */
    function regexpToRegexp (path, keys) {
      // Use a negative lookahead to match only capturing groups.
      var groups = path.source.match(/\((?!\?)/g);

      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: null,
            delimiter: null,
            optional: false,
            repeat: false,
            pattern: null
          });
        }
      }

      return attachKeys(path, keys)
    }

    /**
     * Transform an array into a regexp.
     *
     * @param  {Array}  path
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function arrayToRegexp (path, keys, options) {
      var parts = [];

      for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
      }

      var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

      return attachKeys(regexp, keys)
    }

    /**
     * Create a path regexp from string input.
     *
     * @param  {String} path
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function stringToRegexp (path, keys, options) {
      var tokens = parse(path);
      var re = tokensToRegExp(tokens, options);

      // Attach keys back to the regexp.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] !== 'string') {
          keys.push(tokens[i]);
        }
      }

      return attachKeys(re, keys)
    }

    /**
     * Expose a function for taking tokens and returning a RegExp.
     *
     * @param  {Array}  tokens
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function tokensToRegExp (tokens, options) {
      options = options || {};

      var strict = options.strict;
      var end = options.end !== false;
      var route = '';
      var lastToken = tokens[tokens.length - 1];
      var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

      // Iterate over the tokens and create our regexp string.
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          route += escapeString(token);
        } else {
          var prefix = escapeString(token.prefix);
          var capture = token.pattern;

          if (token.repeat) {
            capture += '(?:' + prefix + capture + ')*';
          }

          if (token.optional) {
            if (prefix) {
              capture = '(?:' + prefix + '(' + capture + '))?';
            } else {
              capture = '(' + capture + ')?';
            }
          } else {
            capture = prefix + '(' + capture + ')';
          }

          route += capture;
        }
      }

      // In non-strict mode we allow a slash at the end of match. If the path to
      // match already ends with a slash, we remove it for consistency. The slash
      // is valid at the end of a path match, not in the middle. This is important
      // in non-ending mode, where "/test/" shouldn't match "/test//route".
      if (!strict) {
        route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
      }

      if (end) {
        route += '$';
      } else {
        // In non-ending mode, we need the capturing groups to match as much as
        // possible by using a positive lookahead to the end or next path segment.
        route += strict && endsWithSlash ? '' : '(?=\\/|$)';
      }

      return new RegExp('^' + route, flags(options))
    }

    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     *
     * @param  {(String|RegExp|Array)} path
     * @param  {Array}                 [keys]
     * @param  {Object}                [options]
     * @return {RegExp}
     */
    function pathToRegexp (path, keys, options) {
      keys = keys || [];

      if (!isarray(keys)) {
        options = keys;
        keys = [];
      } else if (!options) {
        options = {};
      }

      if (path instanceof RegExp) {
        return regexpToRegexp(path, keys)
      }

      if (isarray(path)) {
        return arrayToRegexp(path, keys, options)
      }

      return stringToRegexp(path, keys, options)
    }

    pathToRegexp_1.parse = parse_1;
    pathToRegexp_1.compile = compile_1;
    pathToRegexp_1.tokensToFunction = tokensToFunction_1;
    pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

    /**
       * Module dependencies.
       */

      

      /**
       * Short-cuts for global-object checks
       */

      var hasDocument = ('undefined' !== typeof document);
      var hasWindow = ('undefined' !== typeof window);
      var hasHistory = ('undefined' !== typeof history);
      var hasProcess = typeof process !== 'undefined';

      /**
       * Detect click event
       */
      var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

      /**
       * To work properly with the URL
       * history.location generated polyfill in https://github.com/devote/HTML5-History-API
       */

      var isLocation = hasWindow && !!(window.history.location || window.location);

      /**
       * The page instance
       * @api private
       */
      function Page() {
        // public things
        this.callbacks = [];
        this.exits = [];
        this.current = '';
        this.len = 0;

        // private things
        this._decodeURLComponents = true;
        this._base = '';
        this._strict = false;
        this._running = false;
        this._hashbang = false;

        // bound functions
        this.clickHandler = this.clickHandler.bind(this);
        this._onpopstate = this._onpopstate.bind(this);
      }

      /**
       * Configure the instance of page. This can be called multiple times.
       *
       * @param {Object} options
       * @api public
       */

      Page.prototype.configure = function(options) {
        var opts = options || {};

        this._window = opts.window || (hasWindow && window);
        this._decodeURLComponents = opts.decodeURLComponents !== false;
        this._popstate = opts.popstate !== false && hasWindow;
        this._click = opts.click !== false && hasDocument;
        this._hashbang = !!opts.hashbang;

        var _window = this._window;
        if(this._popstate) {
          _window.addEventListener('popstate', this._onpopstate, false);
        } else if(hasWindow) {
          _window.removeEventListener('popstate', this._onpopstate, false);
        }

        if (this._click) {
          _window.document.addEventListener(clickEvent, this.clickHandler, false);
        } else if(hasDocument) {
          _window.document.removeEventListener(clickEvent, this.clickHandler, false);
        }

        if(this._hashbang && hasWindow && !hasHistory) {
          _window.addEventListener('hashchange', this._onpopstate, false);
        } else if(hasWindow) {
          _window.removeEventListener('hashchange', this._onpopstate, false);
        }
      };

      /**
       * Get or set basepath to `path`.
       *
       * @param {string} path
       * @api public
       */

      Page.prototype.base = function(path) {
        if (0 === arguments.length) return this._base;
        this._base = path;
      };

      /**
       * Gets the `base`, which depends on whether we are using History or
       * hashbang routing.

       * @api private
       */
      Page.prototype._getBase = function() {
        var base = this._base;
        if(!!base) return base;
        var loc = hasWindow && this._window && this._window.location;

        if(hasWindow && this._hashbang && loc && loc.protocol === 'file:') {
          base = loc.pathname;
        }

        return base;
      };

      /**
       * Get or set strict path matching to `enable`
       *
       * @param {boolean} enable
       * @api public
       */

      Page.prototype.strict = function(enable) {
        if (0 === arguments.length) return this._strict;
        this._strict = enable;
      };


      /**
       * Bind with the given `options`.
       *
       * Options:
       *
       *    - `click` bind to click events [true]
       *    - `popstate` bind to popstate [true]
       *    - `dispatch` perform initial dispatch [true]
       *
       * @param {Object} options
       * @api public
       */

      Page.prototype.start = function(options) {
        var opts = options || {};
        this.configure(opts);

        if (false === opts.dispatch) return;
        this._running = true;

        var url;
        if(isLocation) {
          var window = this._window;
          var loc = window.location;

          if(this._hashbang && ~loc.hash.indexOf('#!')) {
            url = loc.hash.substr(2) + loc.search;
          } else if (this._hashbang) {
            url = loc.search + loc.hash;
          } else {
            url = loc.pathname + loc.search + loc.hash;
          }
        }

        this.replace(url, null, true, opts.dispatch);
      };

      /**
       * Unbind click and popstate event handlers.
       *
       * @api public
       */

      Page.prototype.stop = function() {
        if (!this._running) return;
        this.current = '';
        this.len = 0;
        this._running = false;

        var window = this._window;
        this._click && window.document.removeEventListener(clickEvent, this.clickHandler, false);
        hasWindow && window.removeEventListener('popstate', this._onpopstate, false);
        hasWindow && window.removeEventListener('hashchange', this._onpopstate, false);
      };

      /**
       * Show `path` with optional `state` object.
       *
       * @param {string} path
       * @param {Object=} state
       * @param {boolean=} dispatch
       * @param {boolean=} push
       * @return {!Context}
       * @api public
       */

      Page.prototype.show = function(path, state, dispatch, push) {
        var ctx = new Context(path, state, this),
          prev = this.prevContext;
        this.prevContext = ctx;
        this.current = ctx.path;
        if (false !== dispatch) this.dispatch(ctx, prev);
        if (false !== ctx.handled && false !== push) ctx.pushState();
        return ctx;
      };

      /**
       * Goes back in the history
       * Back should always let the current route push state and then go back.
       *
       * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
       * @param {Object=} state
       * @api public
       */

      Page.prototype.back = function(path, state) {
        var page = this;
        if (this.len > 0) {
          var window = this._window;
          // this may need more testing to see if all browsers
          // wait for the next tick to go back in history
          hasHistory && window.history.back();
          this.len--;
        } else if (path) {
          setTimeout(function() {
            page.show(path, state);
          });
        } else {
          setTimeout(function() {
            page.show(page._getBase(), state);
          });
        }
      };

      /**
       * Register route to redirect from one path to other
       * or just redirect to another route
       *
       * @param {string} from - if param 'to' is undefined redirects to 'from'
       * @param {string=} to
       * @api public
       */
      Page.prototype.redirect = function(from, to) {
        var inst = this;

        // Define route from a path to another
        if ('string' === typeof from && 'string' === typeof to) {
          page.call(this, from, function(e) {
            setTimeout(function() {
              inst.replace(/** @type {!string} */ (to));
            }, 0);
          });
        }

        // Wait for the push state and replace it with another
        if ('string' === typeof from && 'undefined' === typeof to) {
          setTimeout(function() {
            inst.replace(from);
          }, 0);
        }
      };

      /**
       * Replace `path` with optional `state` object.
       *
       * @param {string} path
       * @param {Object=} state
       * @param {boolean=} init
       * @param {boolean=} dispatch
       * @return {!Context}
       * @api public
       */


      Page.prototype.replace = function(path, state, init, dispatch) {
        var ctx = new Context(path, state, this),
          prev = this.prevContext;
        this.prevContext = ctx;
        this.current = ctx.path;
        ctx.init = init;
        ctx.save(); // save before dispatching, which may redirect
        if (false !== dispatch) this.dispatch(ctx, prev);
        return ctx;
      };

      /**
       * Dispatch the given `ctx`.
       *
       * @param {Context} ctx
       * @api private
       */

      Page.prototype.dispatch = function(ctx, prev) {
        var i = 0, j = 0, page = this;

        function nextExit() {
          var fn = page.exits[j++];
          if (!fn) return nextEnter();
          fn(prev, nextExit);
        }

        function nextEnter() {
          var fn = page.callbacks[i++];

          if (ctx.path !== page.current) {
            ctx.handled = false;
            return;
          }
          if (!fn) return unhandled.call(page, ctx);
          fn(ctx, nextEnter);
        }

        if (prev) {
          nextExit();
        } else {
          nextEnter();
        }
      };

      /**
       * Register an exit route on `path` with
       * callback `fn()`, which will be called
       * on the previous context when a new
       * page is visited.
       */
      Page.prototype.exit = function(path, fn) {
        if (typeof path === 'function') {
          return this.exit('*', path);
        }

        var route = new Route(path, null, this);
        for (var i = 1; i < arguments.length; ++i) {
          this.exits.push(route.middleware(arguments[i]));
        }
      };

      /**
       * Handle "click" events.
       */

      /* jshint +W054 */
      Page.prototype.clickHandler = function(e) {
        if (1 !== this._which(e)) return;

        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (e.defaultPrevented) return;

        // ensure link
        // use shadow dom when available if not, fall back to composedPath()
        // for browsers that only have shady
        var el = e.target;
        var eventPath = e.path || (e.composedPath ? e.composedPath() : null);

        if(eventPath) {
          for (var i = 0; i < eventPath.length; i++) {
            if (!eventPath[i].nodeName) continue;
            if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;
            if (!eventPath[i].href) continue;

            el = eventPath[i];
            break;
          }
        }

        // continue ensure link
        // el.nodeName for svg links are 'a' instead of 'A'
        while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
        if (!el || 'A' !== el.nodeName.toUpperCase()) return;

        // check if link is inside an svg
        // in this case, both href and target are always inside an object
        var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

        // Ignore if tag has
        // 1. "download" attribute
        // 2. rel="external" attribute
        if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

        // ensure non-hash for the same path
        var link = el.getAttribute('href');
        if(!this._hashbang && this._samePath(el) && (el.hash || '#' === link)) return;

        // Check for mailto: in the href
        if (link && link.indexOf('mailto:') > -1) return;

        // check target
        // svg target is an object and its desired value is in .baseVal property
        if (svg ? el.target.baseVal : el.target) return;

        // x-origin
        // note: svg links that are not relative don't call click events (and skip page.js)
        // consequently, all svg links tested inside page.js are relative and in the same origin
        if (!svg && !this.sameOrigin(el.href)) return;

        // rebuild path
        // There aren't .pathname and .search properties in svg links, so we use href
        // Also, svg href is an object and its desired value is in .baseVal property
        var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

        path = path[0] !== '/' ? '/' + path : path;

        // strip leading "/[drive letter]:" on NW.js on Windows
        if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
          path = path.replace(/^\/[a-zA-Z]:\//, '/');
        }

        // same page
        var orig = path;
        var pageBase = this._getBase();

        if (path.indexOf(pageBase) === 0) {
          path = path.substr(pageBase.length);
        }

        if (this._hashbang) path = path.replace('#!', '');

        if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== 'file:')) {
          return;
        }

        e.preventDefault();
        this.show(orig);
      };

      /**
       * Handle "populate" events.
       * @api private
       */

      Page.prototype._onpopstate = (function () {
        var loaded = false;
        if ( ! hasWindow ) {
          return function () {};
        }
        if (hasDocument && document.readyState === 'complete') {
          loaded = true;
        } else {
          window.addEventListener('load', function() {
            setTimeout(function() {
              loaded = true;
            }, 0);
          });
        }
        return function onpopstate(e) {
          if (!loaded) return;
          var page = this;
          if (e.state) {
            var path = e.state.path;
            page.replace(path, e.state);
          } else if (isLocation) {
            var loc = page._window.location;
            page.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
          }
        };
      })();

      /**
       * Event button.
       */
      Page.prototype._which = function(e) {
        e = e || (hasWindow && this._window.event);
        return null == e.which ? e.button : e.which;
      };

      /**
       * Convert to a URL object
       * @api private
       */
      Page.prototype._toURL = function(href) {
        var window = this._window;
        if(typeof URL === 'function' && isLocation) {
          return new URL(href, window.location.toString());
        } else if (hasDocument) {
          var anc = window.document.createElement('a');
          anc.href = href;
          return anc;
        }
      };

      /**
       * Check if `href` is the same origin.
       * @param {string} href
       * @api public
       */
      Page.prototype.sameOrigin = function(href) {
        if(!href || !isLocation) return false;

        var url = this._toURL(href);
        var window = this._window;

        var loc = window.location;

        /*
           When the port is the default http port 80 for http, or 443 for
           https, internet explorer 11 returns an empty string for loc.port,
           so we need to compare loc.port with an empty string if url.port
           is the default port 80 or 443.
           Also the comparition with `port` is changed from `===` to `==` because
           `port` can be a string sometimes. This only applies to ie11.
        */
        return loc.protocol === url.protocol &&
          loc.hostname === url.hostname &&
          (loc.port === url.port || loc.port === '' && (url.port == 80 || url.port == 443)); // jshint ignore:line
      };

      /**
       * @api private
       */
      Page.prototype._samePath = function(url) {
        if(!isLocation) return false;
        var window = this._window;
        var loc = window.location;
        return url.pathname === loc.pathname &&
          url.search === loc.search;
      };

      /**
       * Remove URL encoding from the given `str`.
       * Accommodates whitespace in both x-www-form-urlencoded
       * and regular percent-encoded form.
       *
       * @param {string} val - URL component to decode
       * @api private
       */
      Page.prototype._decodeURLEncodedURIComponent = function(val) {
        if (typeof val !== 'string') { return val; }
        return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
      };

      /**
       * Create a new `page` instance and function
       */
      function createPage() {
        var pageInstance = new Page();

        function pageFn(/* args */) {
          return page.apply(pageInstance, arguments);
        }

        // Copy all of the things over. In 2.0 maybe we use setPrototypeOf
        pageFn.callbacks = pageInstance.callbacks;
        pageFn.exits = pageInstance.exits;
        pageFn.base = pageInstance.base.bind(pageInstance);
        pageFn.strict = pageInstance.strict.bind(pageInstance);
        pageFn.start = pageInstance.start.bind(pageInstance);
        pageFn.stop = pageInstance.stop.bind(pageInstance);
        pageFn.show = pageInstance.show.bind(pageInstance);
        pageFn.back = pageInstance.back.bind(pageInstance);
        pageFn.redirect = pageInstance.redirect.bind(pageInstance);
        pageFn.replace = pageInstance.replace.bind(pageInstance);
        pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
        pageFn.exit = pageInstance.exit.bind(pageInstance);
        pageFn.configure = pageInstance.configure.bind(pageInstance);
        pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
        pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);

        pageFn.create = createPage;

        Object.defineProperty(pageFn, 'len', {
          get: function(){
            return pageInstance.len;
          },
          set: function(val) {
            pageInstance.len = val;
          }
        });

        Object.defineProperty(pageFn, 'current', {
          get: function(){
            return pageInstance.current;
          },
          set: function(val) {
            pageInstance.current = val;
          }
        });

        // In 2.0 these can be named exports
        pageFn.Context = Context;
        pageFn.Route = Route;

        return pageFn;
      }

      /**
       * Register `path` with callback `fn()`,
       * or route `path`, or redirection,
       * or `page.start()`.
       *
       *   page(fn);
       *   page('*', fn);
       *   page('/user/:id', load, user);
       *   page('/user/' + user.id, { some: 'thing' });
       *   page('/user/' + user.id);
       *   page('/from', '/to')
       *   page();
       *
       * @param {string|!Function|!Object} path
       * @param {Function=} fn
       * @api public
       */

      function page(path, fn) {
        // <callback>
        if ('function' === typeof path) {
          return page.call(this, '*', path);
        }

        // route <path> to <callback ...>
        if ('function' === typeof fn) {
          var route = new Route(/** @type {string} */ (path), null, this);
          for (var i = 1; i < arguments.length; ++i) {
            this.callbacks.push(route.middleware(arguments[i]));
          }
          // show <path> with [state]
        } else if ('string' === typeof path) {
          this['string' === typeof fn ? 'redirect' : 'show'](path, fn);
          // start [options]
        } else {
          this.start(path);
        }
      }

      /**
       * Unhandled `ctx`. When it's not the initial
       * popstate then redirect. If you wish to handle
       * 404s on your own use `page('*', callback)`.
       *
       * @param {Context} ctx
       * @api private
       */
      function unhandled(ctx) {
        if (ctx.handled) return;
        var current;
        var page = this;
        var window = page._window;

        if (page._hashbang) {
          current = isLocation && this._getBase() + window.location.hash.replace('#!', '');
        } else {
          current = isLocation && window.location.pathname + window.location.search;
        }

        if (current === ctx.canonicalPath) return;
        page.stop();
        ctx.handled = false;
        isLocation && (window.location.href = ctx.canonicalPath);
      }

      /**
       * Escapes RegExp characters in the given string.
       *
       * @param {string} s
       * @api private
       */
      function escapeRegExp(s) {
        return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
      }

      /**
       * Initialize a new "request" `Context`
       * with the given `path` and optional initial `state`.
       *
       * @constructor
       * @param {string} path
       * @param {Object=} state
       * @api public
       */

      function Context(path, state, pageInstance) {
        var _page = this.page = pageInstance || page;
        var window = _page._window;
        var hashbang = _page._hashbang;

        var pageBase = _page._getBase();
        if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;
        var i = path.indexOf('?');

        this.canonicalPath = path;
        var re = new RegExp('^' + escapeRegExp(pageBase));
        this.path = path.replace(re, '') || '/';
        if (hashbang) this.path = this.path.replace('#!', '') || '/';

        this.title = (hasDocument && window.document.title);
        this.state = state || {};
        this.state.path = path;
        this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
        this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
        this.params = {};

        // fragment
        this.hash = '';
        if (!hashbang) {
          if (!~this.path.indexOf('#')) return;
          var parts = this.path.split('#');
          this.path = this.pathname = parts[0];
          this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || '';
          this.querystring = this.querystring.split('#')[0];
        }
      }

      /**
       * Push state.
       *
       * @api private
       */

      Context.prototype.pushState = function() {
        var page = this.page;
        var window = page._window;
        var hashbang = page._hashbang;

        page.len++;
        if (hasHistory) {
            window.history.pushState(this.state, this.title,
              hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
        }
      };

      /**
       * Save the context state.
       *
       * @api public
       */

      Context.prototype.save = function() {
        var page = this.page;
        if (hasHistory) {
            page._window.history.replaceState(this.state, this.title,
              page._hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
        }
      };

      /**
       * Initialize `Route` with the given HTTP `path`,
       * and an array of `callbacks` and `options`.
       *
       * Options:
       *
       *   - `sensitive`    enable case-sensitive routes
       *   - `strict`       enable strict matching for trailing slashes
       *
       * @constructor
       * @param {string} path
       * @param {Object=} options
       * @api private
       */

      function Route(path, options, page) {
        var _page = this.page = page || globalPage;
        var opts = options || {};
        opts.strict = opts.strict || _page._strict;
        this.path = (path === '*') ? '(.*)' : path;
        this.method = 'GET';
        this.regexp = pathToRegexp_1(this.path, this.keys = [], opts);
      }

      /**
       * Return route middleware with
       * the given callback `fn()`.
       *
       * @param {Function} fn
       * @return {Function}
       * @api public
       */

      Route.prototype.middleware = function(fn) {
        var self = this;
        return function(ctx, next) {
          if (self.match(ctx.path, ctx.params)) {
            ctx.routePath = self.path;
            return fn(ctx, next);
          }
          next();
        };
      };

      /**
       * Check if this route matches `path`, if so
       * populate `params`.
       *
       * @param {string} path
       * @param {Object} params
       * @return {boolean}
       * @api private
       */

      Route.prototype.match = function(path, params) {
        var keys = this.keys,
          qsIndex = path.indexOf('?'),
          pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
          m = this.regexp.exec(decodeURIComponent(pathname));

        if (!m) return false;

        delete params[0];

        for (var i = 1, len = m.length; i < len; ++i) {
          var key = keys[i - 1];
          var val = this.page._decodeURLEncodedURIComponent(m[i]);
          if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
            params[key.name] = val;
          }
        }

        return true;
      };


      /**
       * Module exports.
       */

      var globalPage = createPage();
      var page_js = globalPage;
      var default_1 = globalPage;

    page_js.default = default_1;

    return page_js;

    })));
    });

    /* src/rutas/Ruteador.svelte generated by Svelte v3.24.1 */

    const { Object: Object_1 } = globals;

    function create_fragment(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const rutas = {};
    const rutaActiva = writable({});

    function registrar(ruta) {
    	rutas[ruta.path] = ruta;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $rutaActiva,
    		$$unsubscribe_rutaActiva = noop;

    	validate_store(rutaActiva, "rutaActiva");
    	component_subscribe($$self, rutaActiva, $$value => $$invalidate(2, $rutaActiva = $$value));
    	$$self.$$.on_destroy.push(() => $$unsubscribe_rutaActiva());

    	const configurarPaginas = () => {
    		for (let [path, componente] of Object.entries(rutas)) {
    			page(path, ctx => set_store_value(rutaActiva, $rutaActiva = { ...componente, parametros: ctx.params }));
    		}

    		// iniciamos page.js
    		page.start();
    	};

    	// al montar un componente
    	onMount(configurarPaginas);

    	// al destruir un componente
    	onDestroy(page.stop);

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Ruteador> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Ruteador", $$slots, ['default']);

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		writable,
    		rutas,
    		rutaActiva,
    		registrar,
    		onMount,
    		onDestroy,
    		page,
    		configurarPaginas,
    		$rutaActiva
    	});

    	return [$$scope, $$slots];
    }

    class Ruteador extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ruteador",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/rutas/Ruta.svelte generated by Svelte v3.24.1 */
    const get_default_slot_changes = dirty => ({ parametros: dirty & /*parametros*/ 2 });
    const get_default_slot_context = ctx => ({ parametros: /*parametros*/ ctx[1] });

    // (21:0) {#if $rutaActiva.path === path}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$rutaActiva*/ ctx[2].componente) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(21:0) {#if $rutaActiva.path === path}",
    		ctx
    	});

    	return block;
    }

    // (28:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, parametros*/ 34) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(28:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (22:2) {#if $rutaActiva.componente}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*$$restProps*/ ctx[3], /*parametros*/ ctx[1]];
    	var switch_value = /*$rutaActiva*/ ctx[2].componente;

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps, parametros*/ 10)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$$restProps*/ 8 && get_spread_object(/*$$restProps*/ ctx[3]),
    					dirty & /*parametros*/ 2 && get_spread_object(/*parametros*/ ctx[1])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*$rutaActiva*/ ctx[2].componente)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(22:2) {#if $rutaActiva.componente}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$rutaActiva*/ ctx[2].path === /*path*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$rutaActiva*/ ctx[2].path === /*path*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$rutaActiva, path*/ 5) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	const omit_props_names = ["path","componente"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $rutaActiva;
    	validate_store(rutaActiva, "rutaActiva");
    	component_subscribe($$self, rutaActiva, $$value => $$invalidate(2, $rutaActiva = $$value));
    	let { path = "*" } = $$props;
    	let { componente = null } = $$props;

    	// argumetos pasados al componente por la ruta
    	let parametros = {};

    	// invocamos a registrar : path y componente asociado
    	registrar({ path, componente });

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Ruta", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("path" in $$new_props) $$invalidate(0, path = $$new_props.path);
    		if ("componente" in $$new_props) $$invalidate(4, componente = $$new_props.componente);
    		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		registrar,
    		rutaActiva,
    		path,
    		componente,
    		parametros,
    		$rutaActiva
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("path" in $$props) $$invalidate(0, path = $$new_props.path);
    		if ("componente" in $$props) $$invalidate(4, componente = $$new_props.componente);
    		if ("parametros" in $$props) $$invalidate(1, parametros = $$new_props.parametros);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$rutaActiva, path*/ 5) {
    			// reactivo, se ejecuta al cambiar $rutaActiva
    			 if ($rutaActiva.path === path) {
    				$$invalidate(1, parametros = $rutaActiva.parametros);
    			}
    		}
    	};

    	return [path, parametros, $rutaActiva, $$restProps, componente, $$scope, $$slots];
    }

    class Ruta extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { path: 0, componente: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ruta",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get path() {
    		throw new Error("<Ruta>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Ruta>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get componente() {
    		throw new Error("<Ruta>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set componente(value) {
    		throw new Error("<Ruta>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/rutas/NoEncontrado.svelte generated by Svelte v3.24.1 */

    const file = "src/rutas/NoEncontrado.svelte";

    function create_fragment$2(ctx) {
    	let main;
    	let h20;
    	let t1;
    	let h21;
    	let t3;
    	let a;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h20 = element("h2");
    			h20.textContent = "Lo siento.";
    			t1 = space();
    			h21 = element("h2");
    			h21.textContent = "Página no encontrada.";
    			t3 = space();
    			a = element("a");
    			a.textContent = "Volver";
    			attr_dev(h20, "class", "svelte-1cvqavx");
    			add_location(h20, file, 27, 2, 430);
    			attr_dev(h21, "class", "svelte-1cvqavx");
    			add_location(h21, file, 28, 2, 452);
    			attr_dev(a, "href", "/");
    			add_location(a, file, 29, 2, 485);
    			add_location(main, file, 20, 0, 308);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h20);
    			append_dev(main, t1);
    			append_dev(main, h21);
    			append_dev(main, t3);
    			append_dev(main, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NoEncontrado> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("NoEncontrado", $$slots, []);
    	return [];
    }

    class NoEncontrado extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NoEncontrado",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFoundation = /** @class */ (function () {
        function MDCFoundation(adapter) {
            if (adapter === void 0) { adapter = {}; }
            this.adapter_ = adapter;
        }
        Object.defineProperty(MDCFoundation, "cssClasses", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports every
                // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "strings", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "numbers", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
                return {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "defaultAdapter", {
            get: function () {
                // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
                // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
                // validation.
                return {};
            },
            enumerable: true,
            configurable: true
        });
        MDCFoundation.prototype.init = function () {
            // Subclasses should override this method to perform initialization routines (registering events, etc.)
        };
        MDCFoundation.prototype.destroy = function () {
            // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        };
        return MDCFoundation;
    }());

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCComponent = /** @class */ (function () {
        function MDCComponent(root, foundation) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.root_ = root;
            this.initialize.apply(this, __spread(args));
            // Note that we initialize foundation here and not within the constructor's default param so that
            // this.root_ is defined and can be used within the foundation class.
            this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
            this.foundation_.init();
            this.initialSyncWithDOM();
        }
        MDCComponent.attachTo = function (root) {
            // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
            // returns an instantiated component with its root set to that element. Also note that in the cases of
            // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
            // from getDefaultFoundation().
            return new MDCComponent(root, new MDCFoundation({}));
        };
        /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
        MDCComponent.prototype.initialize = function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
            // Subclasses can override this to do any additional setup work that would be considered part of a
            // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
            // initialized. Any additional arguments besides root and foundation will be passed in here.
        };
        MDCComponent.prototype.getDefaultFoundation = function () {
            // Subclasses must override this method to return a properly configured foundation class for the
            // component.
            throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
                'foundation class');
        };
        MDCComponent.prototype.initialSyncWithDOM = function () {
            // Subclasses should override this method if they need to perform work to synchronize with a host DOM
            // object. An example of this would be a form control wrapper that needs to synchronize its internal state
            // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
            // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
        };
        MDCComponent.prototype.destroy = function () {
            // Subclasses may implement this method to release any resources / deregister any listeners they have
            // attached. An example of this might be deregistering a resize event from the window object.
            this.foundation_.destroy();
        };
        MDCComponent.prototype.listen = function (evtType, handler, options) {
            this.root_.addEventListener(evtType, handler, options);
        };
        MDCComponent.prototype.unlisten = function (evtType, handler, options) {
            this.root_.removeEventListener(evtType, handler, options);
        };
        /**
         * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
         */
        MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
            if (shouldBubble === void 0) { shouldBubble = false; }
            var evt;
            if (typeof CustomEvent === 'function') {
                evt = new CustomEvent(evtType, {
                    bubbles: shouldBubble,
                    detail: evtData,
                });
            }
            else {
                evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(evtType, shouldBubble, false, evtData);
            }
            this.root_.dispatchEvent(evt);
        };
        return MDCComponent;
    }());

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var jsEventTypeMap = {
        animationend: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationEnd',
            standard: 'animationend',
        },
        animationiteration: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationIteration',
            standard: 'animationiteration',
        },
        animationstart: {
            cssProperty: 'animation',
            prefixed: 'webkitAnimationStart',
            standard: 'animationstart',
        },
        transitionend: {
            cssProperty: 'transition',
            prefixed: 'webkitTransitionEnd',
            standard: 'transitionend',
        },
    };
    function isWindow(windowObj) {
        return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
    }
    function getCorrectEventName(windowObj, eventType) {
        if (isWindow(windowObj) && eventType in jsEventTypeMap) {
            var el = windowObj.document.createElement('div');
            var _a = jsEventTypeMap[eventType], standard = _a.standard, prefixed = _a.prefixed, cssProperty = _a.cssProperty;
            var isStandard = cssProperty in el.style;
            return isStandard ? standard : prefixed;
        }
        return eventType;
    }

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Stores result from applyPassive to avoid redundant processing to detect
     * passive event listener support.
     */
    var supportsPassive_;
    /**
     * Determine whether the current browser supports passive event listeners, and
     * if so, use them.
     */
    function applyPassive(globalObj, forceRefresh) {
        if (globalObj === void 0) { globalObj = window; }
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (supportsPassive_ === undefined || forceRefresh) {
            var isSupported_1 = false;
            try {
                globalObj.document.addEventListener('test', function () { return undefined; }, {
                    get passive() {
                        isSupported_1 = true;
                        return isSupported_1;
                    },
                });
            }
            catch (e) {
            } // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.
            supportsPassive_ = isSupported_1;
        }
        return supportsPassive_ ? { passive: true } : false;
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
     * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
     */
    function closest(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }
        var el = element;
        while (el) {
            if (matches(el, selector)) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    function matches(element, selector) {
        var nativeMatches = element.matches
            || element.webkitMatchesSelector
            || element.msMatchesSelector;
        return nativeMatches.call(element, selector);
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses = {
        // Ripple is a special case where the "root" component is really a "mixin" of sorts,
        // given that it's an 'upgrade' to an existing component. That being said it is the root
        // CSS class that all other CSS classes derive from.
        BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
        FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
        FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
        ROOT: 'mdc-ripple-upgraded',
        UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    };
    var strings = {
        VAR_FG_SCALE: '--mdc-ripple-fg-scale',
        VAR_FG_SIZE: '--mdc-ripple-fg-size',
        VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
        VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
        VAR_LEFT: '--mdc-ripple-left',
        VAR_TOP: '--mdc-ripple-top',
    };
    var numbers = {
        DEACTIVATION_TIMEOUT_MS: 225,
        FG_DEACTIVATION_MS: 150,
        INITIAL_ORIGIN_SCALE: 0.6,
        PADDING: 10,
        TAP_DELAY_MS: 300,
    };

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to
     * detect CSS custom variable support.
     */
    var supportsCssVariables_;
    function detectEdgePseudoVarBug(windowObj) {
        // Detect versions of Edge with buggy var() support
        // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
        var document = windowObj.document;
        var node = document.createElement('div');
        node.className = 'mdc-ripple-surface--test-edge-var-bug';
        // Append to head instead of body because this script might be invoked in the
        // head, in which case the body doesn't exist yet. The probe works either way.
        document.head.appendChild(node);
        // The bug exists if ::before style ends up propagating to the parent element.
        // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
        // but Firefox is known to support CSS custom properties correctly.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        var computedStyle = windowObj.getComputedStyle(node);
        var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return hasPseudoVarBug;
    }
    function supportsCssVariables(windowObj, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        var CSS = windowObj.CSS;
        var supportsCssVars = supportsCssVariables_;
        if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
            return supportsCssVariables_;
        }
        var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
        if (!supportsFunctionPresent) {
            return false;
        }
        var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
        // See: https://bugs.webkit.org/show_bug.cgi?id=154669
        // See: README section on Safari
        var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
            CSS.supports('color', '#00000000'));
        if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
            supportsCssVars = !detectEdgePseudoVarBug(windowObj);
        }
        else {
            supportsCssVars = false;
        }
        if (!forceRefresh) {
            supportsCssVariables_ = supportsCssVars;
        }
        return supportsCssVars;
    }
    function getNormalizedEventCoords(evt, pageOffset, clientRect) {
        if (!evt) {
            return { x: 0, y: 0 };
        }
        var x = pageOffset.x, y = pageOffset.y;
        var documentX = x + clientRect.left;
        var documentY = y + clientRect.top;
        var normalizedX;
        var normalizedY;
        // Determine touch point relative to the ripple container.
        if (evt.type === 'touchstart') {
            var touchEvent = evt;
            normalizedX = touchEvent.changedTouches[0].pageX - documentX;
            normalizedY = touchEvent.changedTouches[0].pageY - documentY;
        }
        else {
            var mouseEvent = evt;
            normalizedX = mouseEvent.pageX - documentX;
            normalizedY = mouseEvent.pageY - documentY;
        }
        return { x: normalizedX, y: normalizedY };
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = [
        'touchstart', 'pointerdown', 'mousedown', 'keydown',
    ];
    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = [
        'touchend', 'pointerup', 'mouseup', 'contextmenu',
    ];
    // simultaneous nested activations
    var activatedTargets = [];
    var MDCRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCRippleFoundation, _super);
        function MDCRippleFoundation(adapter) {
            var _this = _super.call(this, __assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;
            _this.activationAnimationHasEnded_ = false;
            _this.activationTimer_ = 0;
            _this.fgDeactivationRemovalTimer_ = 0;
            _this.fgScale_ = '0';
            _this.frame_ = { width: 0, height: 0 };
            _this.initialSize_ = 0;
            _this.layoutFrame_ = 0;
            _this.maxRadius_ = 0;
            _this.unboundedCoords_ = { left: 0, top: 0 };
            _this.activationState_ = _this.defaultActivationState_();
            _this.activationTimerCallback_ = function () {
                _this.activationAnimationHasEnded_ = true;
                _this.runDeactivationUXLogicIfReady_();
            };
            _this.activateHandler_ = function (e) { return _this.activate_(e); };
            _this.deactivateHandler_ = function () { return _this.deactivate_(); };
            _this.focusHandler_ = function () { return _this.handleFocus(); };
            _this.blurHandler_ = function () { return _this.handleBlur(); };
            _this.resizeHandler_ = function () { return _this.layout(); };
            return _this;
        }
        Object.defineProperty(MDCRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "strings", {
            get: function () {
                return strings;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "numbers", {
            get: function () {
                return numbers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    browserSupportsCssVars: function () { return true; },
                    computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    containsEventTarget: function () { return true; },
                    deregisterDocumentInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    deregisterResizeHandler: function () { return undefined; },
                    getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                    isSurfaceActive: function () { return true; },
                    isSurfaceDisabled: function () { return true; },
                    isUnbounded: function () { return true; },
                    registerDocumentInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    registerResizeHandler: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    updateCssVariable: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCRippleFoundation.prototype.init = function () {
            var _this = this;
            var supportsPressRipple = this.supportsPressRipple_();
            this.registerRootHandlers_(supportsPressRipple);
            if (supportsPressRipple) {
                var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter_.addClass(ROOT_1);
                    if (_this.adapter_.isUnbounded()) {
                        _this.adapter_.addClass(UNBOUNDED_1);
                        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                        _this.layoutInternal_();
                    }
                });
            }
        };
        MDCRippleFoundation.prototype.destroy = function () {
            var _this = this;
            if (this.supportsPressRipple_()) {
                if (this.activationTimer_) {
                    clearTimeout(this.activationTimer_);
                    this.activationTimer_ = 0;
                    this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                }
                if (this.fgDeactivationRemovalTimer_) {
                    clearTimeout(this.fgDeactivationRemovalTimer_);
                    this.fgDeactivationRemovalTimer_ = 0;
                    this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                }
                var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter_.removeClass(ROOT_2);
                    _this.adapter_.removeClass(UNBOUNDED_2);
                    _this.removeCssVars_();
                });
            }
            this.deregisterRootHandlers_();
            this.deregisterDeactivationHandlers_();
        };
        /**
         * @param evt Optional event containing position information.
         */
        MDCRippleFoundation.prototype.activate = function (evt) {
            this.activate_(evt);
        };
        MDCRippleFoundation.prototype.deactivate = function () {
            this.deactivate_();
        };
        MDCRippleFoundation.prototype.layout = function () {
            var _this = this;
            if (this.layoutFrame_) {
                cancelAnimationFrame(this.layoutFrame_);
            }
            this.layoutFrame_ = requestAnimationFrame(function () {
                _this.layoutInternal_();
                _this.layoutFrame_ = 0;
            });
        };
        MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
            var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
            if (unbounded) {
                this.adapter_.addClass(UNBOUNDED);
            }
            else {
                this.adapter_.removeClass(UNBOUNDED);
            }
        };
        MDCRippleFoundation.prototype.handleFocus = function () {
            var _this = this;
            requestAnimationFrame(function () {
                return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
            });
        };
        MDCRippleFoundation.prototype.handleBlur = function () {
            var _this = this;
            requestAnimationFrame(function () {
                return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
            });
        };
        /**
         * We compute this property so that we are not querying information about the client
         * until the point in time where the foundation requests it. This prevents scenarios where
         * client-side feature-detection may happen too early, such as when components are rendered on the server
         * and then initialized at mount time on the client.
         */
        MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
            return this.adapter_.browserSupportsCssVars();
        };
        MDCRippleFoundation.prototype.defaultActivationState_ = function () {
            return {
                activationEvent: undefined,
                hasDeactivationUXRun: false,
                isActivated: false,
                isProgrammatic: false,
                wasActivatedByPointer: false,
                wasElementMadeActive: false,
            };
        };
        /**
         * supportsPressRipple Passed from init to save a redundant function call
         */
        MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
            var _this = this;
            if (supportsPressRipple) {
                ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                    _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
                });
                if (this.adapter_.isUnbounded()) {
                    this.adapter_.registerResizeHandler(this.resizeHandler_);
                }
            }
            this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
            this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        };
        MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
            var _this = this;
            if (evt.type === 'keydown') {
                this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
            }
            else {
                POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                    _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
                });
            }
        };
        MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
            var _this = this;
            ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
            });
            this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
            this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
            if (this.adapter_.isUnbounded()) {
                this.adapter_.deregisterResizeHandler(this.resizeHandler_);
            }
        };
        MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
            var _this = this;
            this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        };
        MDCRippleFoundation.prototype.removeCssVars_ = function () {
            var _this = this;
            var rippleStrings = MDCRippleFoundation.strings;
            var keys = Object.keys(rippleStrings);
            keys.forEach(function (key) {
                if (key.indexOf('VAR_') === 0) {
                    _this.adapter_.updateCssVariable(rippleStrings[key], null);
                }
            });
        };
        MDCRippleFoundation.prototype.activate_ = function (evt) {
            var _this = this;
            if (this.adapter_.isSurfaceDisabled()) {
                return;
            }
            var activationState = this.activationState_;
            if (activationState.isActivated) {
                return;
            }
            // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
            var previousActivationEvent = this.previousActivationEvent_;
            var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
            if (isSameInteraction) {
                return;
            }
            activationState.isActivated = true;
            activationState.isProgrammatic = evt === undefined;
            activationState.activationEvent = evt;
            activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
            var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) { return _this.adapter_.containsEventTarget(target); });
            if (hasActivatedChild) {
                // Immediately reset activation state, while preserving logic that prevents touch follow-on events
                this.resetActivationState_();
                return;
            }
            if (evt !== undefined) {
                activatedTargets.push(evt.target);
                this.registerDeactivationHandlers_(evt);
            }
            activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
            if (activationState.wasElementMadeActive) {
                this.animateActivation_();
            }
            requestAnimationFrame(function () {
                // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
                activatedTargets = [];
                if (!activationState.wasElementMadeActive
                    && evt !== undefined
                    && (evt.key === ' ' || evt.keyCode === 32)) {
                    // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                    // active states inconsistently when they're called within event handling code:
                    // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                    // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                    // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                    // variable is set within a rAF callback for a submit button interaction (#2241).
                    activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                    if (activationState.wasElementMadeActive) {
                        _this.animateActivation_();
                    }
                }
                if (!activationState.wasElementMadeActive) {
                    // Reset activation state immediately if element was not made active.
                    _this.activationState_ = _this.defaultActivationState_();
                }
            });
        };
        MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
            return (evt !== undefined && evt.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
        };
        MDCRippleFoundation.prototype.animateActivation_ = function () {
            var _this = this;
            var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
            var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
            var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
            this.layoutInternal_();
            var translateStart = '';
            var translateEnd = '';
            if (!this.adapter_.isUnbounded()) {
                var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
                translateStart = startPoint.x + "px, " + startPoint.y + "px";
                translateEnd = endPoint.x + "px, " + endPoint.y + "px";
            }
            this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
            this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
            // Cancel any ongoing activation/deactivation animations
            clearTimeout(this.activationTimer_);
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.rmBoundedActivationClasses_();
            this.adapter_.removeClass(FG_DEACTIVATION);
            // Force layout in order to re-trigger the animation.
            this.adapter_.computeBoundingRect();
            this.adapter_.addClass(FG_ACTIVATION);
            this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
        };
        MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
            var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
            var startPoint;
            if (wasActivatedByPointer) {
                startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
            }
            else {
                startPoint = {
                    x: this.frame_.width / 2,
                    y: this.frame_.height / 2,
                };
            }
            // Center the element around the start point.
            startPoint = {
                x: startPoint.x - (this.initialSize_ / 2),
                y: startPoint.y - (this.initialSize_ / 2),
            };
            var endPoint = {
                x: (this.frame_.width / 2) - (this.initialSize_ / 2),
                y: (this.frame_.height / 2) - (this.initialSize_ / 2),
            };
            return { startPoint: startPoint, endPoint: endPoint };
        };
        MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
            var _this = this;
            // This method is called both when a pointing device is released, and when the activation animation ends.
            // The deactivation animation should only run after both of those occur.
            var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
            var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
            var activationHasEnded = hasDeactivationUXRun || !isActivated;
            if (activationHasEnded && this.activationAnimationHasEnded_) {
                this.rmBoundedActivationClasses_();
                this.adapter_.addClass(FG_DEACTIVATION);
                this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                    _this.adapter_.removeClass(FG_DEACTIVATION);
                }, numbers.FG_DEACTIVATION_MS);
            }
        };
        MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
            this.adapter_.removeClass(FG_ACTIVATION);
            this.activationAnimationHasEnded_ = false;
            this.adapter_.computeBoundingRect();
        };
        MDCRippleFoundation.prototype.resetActivationState_ = function () {
            var _this = this;
            this.previousActivationEvent_ = this.activationState_.activationEvent;
            this.activationState_ = this.defaultActivationState_();
            // Touch devices may fire additional events for the same interaction within a short time.
            // Store the previous event until it's safe to assume that subsequent events are for new interactions.
            setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        };
        MDCRippleFoundation.prototype.deactivate_ = function () {
            var _this = this;
            var activationState = this.activationState_;
            // This can happen in scenarios such as when you have a keyup event that blurs the element.
            if (!activationState.isActivated) {
                return;
            }
            var state = __assign({}, activationState);
            if (activationState.isProgrammatic) {
                requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
                this.resetActivationState_();
            }
            else {
                this.deregisterDeactivationHandlers_();
                requestAnimationFrame(function () {
                    _this.activationState_.hasDeactivationUXRun = true;
                    _this.animateDeactivation_(state);
                    _this.resetActivationState_();
                });
            }
        };
        MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
            var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
            if (wasActivatedByPointer || wasElementMadeActive) {
                this.runDeactivationUXLogicIfReady_();
            }
        };
        MDCRippleFoundation.prototype.layoutInternal_ = function () {
            var _this = this;
            this.frame_ = this.adapter_.computeBoundingRect();
            var maxDim = Math.max(this.frame_.height, this.frame_.width);
            // Surface diameter is treated differently for unbounded vs. bounded ripples.
            // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
            // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
            // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
            // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
            // `overflow: hidden`.
            var getBoundedRadius = function () {
                var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
                return hypotenuse + MDCRippleFoundation.numbers.PADDING;
            };
            this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();
            // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
            this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
            this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
            this.updateLayoutCssVars_();
        };
        MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
            var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
            this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
            this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
            if (this.adapter_.isUnbounded()) {
                this.unboundedCoords_ = {
                    left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                    top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
                };
                this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
                this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
            }
        };
        return MDCRippleFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCRipple = /** @class */ (function (_super) {
        __extends(MDCRipple, _super);
        function MDCRipple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.disabled = false;
            return _this;
        }
        MDCRipple.attachTo = function (root, opts) {
            if (opts === void 0) { opts = { isUnbounded: undefined }; }
            var ripple = new MDCRipple(root);
            // Only override unbounded behavior if option is explicitly specified
            if (opts.isUnbounded !== undefined) {
                ripple.unbounded = opts.isUnbounded;
            }
            return ripple;
        };
        MDCRipple.createAdapter = function (instance) {
            return {
                addClass: function (className) { return instance.root_.classList.add(className); },
                browserSupportsCssVars: function () { return supportsCssVariables(window); },
                computeBoundingRect: function () { return instance.root_.getBoundingClientRect(); },
                containsEventTarget: function (target) { return instance.root_.contains(target); },
                deregisterDocumentInteractionHandler: function (evtType, handler) {
                    return document.documentElement.removeEventListener(evtType, handler, applyPassive());
                },
                deregisterInteractionHandler: function (evtType, handler) {
                    return instance.root_.removeEventListener(evtType, handler, applyPassive());
                },
                deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
                getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); },
                isSurfaceActive: function () { return matches(instance.root_, ':active'); },
                isSurfaceDisabled: function () { return Boolean(instance.disabled); },
                isUnbounded: function () { return Boolean(instance.unbounded); },
                registerDocumentInteractionHandler: function (evtType, handler) {
                    return document.documentElement.addEventListener(evtType, handler, applyPassive());
                },
                registerInteractionHandler: function (evtType, handler) {
                    return instance.root_.addEventListener(evtType, handler, applyPassive());
                },
                registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
                removeClass: function (className) { return instance.root_.classList.remove(className); },
                updateCssVariable: function (varName, value) { return instance.root_.style.setProperty(varName, value); },
            };
        };
        Object.defineProperty(MDCRipple.prototype, "unbounded", {
            get: function () {
                return Boolean(this.unbounded_);
            },
            set: function (unbounded) {
                this.unbounded_ = Boolean(unbounded);
                this.setUnbounded_();
            },
            enumerable: true,
            configurable: true
        });
        MDCRipple.prototype.activate = function () {
            this.foundation_.activate();
        };
        MDCRipple.prototype.deactivate = function () {
            this.foundation_.deactivate();
        };
        MDCRipple.prototype.layout = function () {
            this.foundation_.layout();
        };
        MDCRipple.prototype.getDefaultFoundation = function () {
            return new MDCRippleFoundation(MDCRipple.createAdapter(this));
        };
        MDCRipple.prototype.initialSyncWithDOM = function () {
            var root = this.root_;
            this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
        };
        /**
         * Closure Compiler throws an access control error when directly accessing a
         * protected or private property inside a getter/setter, like unbounded above.
         * By accessing the protected property inside a method, we solve that problem.
         * That's why this function exists.
         */
        MDCRipple.prototype.setUnbounded_ = function () {
            this.foundation_.setUnbounded(Boolean(this.unbounded_));
        };
        return MDCRipple;
    }(MDCComponent));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$1 = {
        ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
        ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
        ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
        ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
        ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
        ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
        BACKGROUND: 'mdc-checkbox__background',
        CHECKED: 'mdc-checkbox--checked',
        CHECKMARK: 'mdc-checkbox__checkmark',
        CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
        DISABLED: 'mdc-checkbox--disabled',
        INDETERMINATE: 'mdc-checkbox--indeterminate',
        MIXEDMARK: 'mdc-checkbox__mixedmark',
        NATIVE_CONTROL: 'mdc-checkbox__native-control',
        ROOT: 'mdc-checkbox',
        SELECTED: 'mdc-checkbox--selected',
        UPGRADED: 'mdc-checkbox--upgraded',
    };
    var strings$1 = {
        ARIA_CHECKED_ATTR: 'aria-checked',
        ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
        NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
        TRANSITION_STATE_CHECKED: 'checked',
        TRANSITION_STATE_INDETERMINATE: 'indeterminate',
        TRANSITION_STATE_INIT: 'init',
        TRANSITION_STATE_UNCHECKED: 'unchecked',
    };
    var numbers$1 = {
        ANIM_END_LATCH_MS: 250,
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCCheckboxFoundation = /** @class */ (function (_super) {
        __extends(MDCCheckboxFoundation, _super);
        function MDCCheckboxFoundation(adapter) {
            var _this = _super.call(this, __assign({}, MDCCheckboxFoundation.defaultAdapter, adapter)) || this;
            _this.currentCheckState_ = strings$1.TRANSITION_STATE_INIT;
            _this.currentAnimationClass_ = '';
            _this.animEndLatchTimer_ = 0;
            _this.enableAnimationEndHandler_ = false;
            return _this;
        }
        Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
            get: function () {
                return cssClasses$1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "strings", {
            get: function () {
                return strings$1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "numbers", {
            get: function () {
                return numbers$1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    forceLayout: function () { return undefined; },
                    hasNativeControl: function () { return false; },
                    isAttachedToDOM: function () { return false; },
                    isChecked: function () { return false; },
                    isIndeterminate: function () { return false; },
                    removeClass: function () { return undefined; },
                    removeNativeControlAttr: function () { return undefined; },
                    setNativeControlAttr: function () { return undefined; },
                    setNativeControlDisabled: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        MDCCheckboxFoundation.prototype.init = function () {
            this.currentCheckState_ = this.determineCheckState_();
            this.updateAriaChecked_();
            this.adapter_.addClass(cssClasses$1.UPGRADED);
        };
        MDCCheckboxFoundation.prototype.destroy = function () {
            clearTimeout(this.animEndLatchTimer_);
        };
        MDCCheckboxFoundation.prototype.setDisabled = function (disabled) {
            this.adapter_.setNativeControlDisabled(disabled);
            if (disabled) {
                this.adapter_.addClass(cssClasses$1.DISABLED);
            }
            else {
                this.adapter_.removeClass(cssClasses$1.DISABLED);
            }
        };
        /**
         * Handles the animationend event for the checkbox
         */
        MDCCheckboxFoundation.prototype.handleAnimationEnd = function () {
            var _this = this;
            if (!this.enableAnimationEndHandler_) {
                return;
            }
            clearTimeout(this.animEndLatchTimer_);
            this.animEndLatchTimer_ = setTimeout(function () {
                _this.adapter_.removeClass(_this.currentAnimationClass_);
                _this.enableAnimationEndHandler_ = false;
            }, numbers$1.ANIM_END_LATCH_MS);
        };
        /**
         * Handles the change event for the checkbox
         */
        MDCCheckboxFoundation.prototype.handleChange = function () {
            this.transitionCheckState_();
        };
        MDCCheckboxFoundation.prototype.transitionCheckState_ = function () {
            if (!this.adapter_.hasNativeControl()) {
                return;
            }
            var oldState = this.currentCheckState_;
            var newState = this.determineCheckState_();
            if (oldState === newState) {
                return;
            }
            this.updateAriaChecked_();
            var TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;
            var SELECTED = cssClasses$1.SELECTED;
            if (newState === TRANSITION_STATE_UNCHECKED) {
                this.adapter_.removeClass(SELECTED);
            }
            else {
                this.adapter_.addClass(SELECTED);
            }
            // Check to ensure that there isn't a previously existing animation class, in case for example
            // the user interacted with the checkbox before the animation was finished.
            if (this.currentAnimationClass_.length > 0) {
                clearTimeout(this.animEndLatchTimer_);
                this.adapter_.forceLayout();
                this.adapter_.removeClass(this.currentAnimationClass_);
            }
            this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
            this.currentCheckState_ = newState;
            // Check for parentNode so that animations are only run when the element is attached
            // to the DOM.
            if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
                this.adapter_.addClass(this.currentAnimationClass_);
                this.enableAnimationEndHandler_ = true;
            }
        };
        MDCCheckboxFoundation.prototype.determineCheckState_ = function () {
            var TRANSITION_STATE_INDETERMINATE = strings$1.TRANSITION_STATE_INDETERMINATE, TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;
            if (this.adapter_.isIndeterminate()) {
                return TRANSITION_STATE_INDETERMINATE;
            }
            return this.adapter_.isChecked() ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
        };
        MDCCheckboxFoundation.prototype.getTransitionAnimationClass_ = function (oldState, newState) {
            var TRANSITION_STATE_INIT = strings$1.TRANSITION_STATE_INIT, TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;
            var _a = MDCCheckboxFoundation.cssClasses, ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED, ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE, ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED, ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE, ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED, ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;
            switch (oldState) {
                case TRANSITION_STATE_INIT:
                    if (newState === TRANSITION_STATE_UNCHECKED) {
                        return '';
                    }
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
                case TRANSITION_STATE_UNCHECKED:
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
                case TRANSITION_STATE_CHECKED:
                    return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
                default: // TRANSITION_STATE_INDETERMINATE
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
            }
        };
        MDCCheckboxFoundation.prototype.updateAriaChecked_ = function () {
            // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
            if (this.adapter_.isIndeterminate()) {
                this.adapter_.setNativeControlAttr(strings$1.ARIA_CHECKED_ATTR, strings$1.ARIA_CHECKED_INDETERMINATE_VALUE);
            }
            else {
                // The on/off state does not need to keep track of aria-checked, since
                // the screenreader uses the checked property on the checkbox element.
                this.adapter_.removeNativeControlAttr(strings$1.ARIA_CHECKED_ATTR);
            }
        };
        return MDCCheckboxFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var CB_PROTO_PROPS = ['checked', 'indeterminate'];
    var MDCCheckbox = /** @class */ (function (_super) {
        __extends(MDCCheckbox, _super);
        function MDCCheckbox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ripple_ = _this.createRipple_();
            return _this;
        }
        MDCCheckbox.attachTo = function (root) {
            return new MDCCheckbox(root);
        };
        Object.defineProperty(MDCCheckbox.prototype, "ripple", {
            get: function () {
                return this.ripple_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "checked", {
            get: function () {
                return this.nativeControl_.checked;
            },
            set: function (checked) {
                this.nativeControl_.checked = checked;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "indeterminate", {
            get: function () {
                return this.nativeControl_.indeterminate;
            },
            set: function (indeterminate) {
                this.nativeControl_.indeterminate = indeterminate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "disabled", {
            get: function () {
                return this.nativeControl_.disabled;
            },
            set: function (disabled) {
                this.foundation_.setDisabled(disabled);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MDCCheckbox.prototype, "value", {
            get: function () {
                return this.nativeControl_.value;
            },
            set: function (value) {
                this.nativeControl_.value = value;
            },
            enumerable: true,
            configurable: true
        });
        MDCCheckbox.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.handleChange_ = function () { return _this.foundation_.handleChange(); };
            this.handleAnimationEnd_ = function () { return _this.foundation_.handleAnimationEnd(); };
            this.nativeControl_.addEventListener('change', this.handleChange_);
            this.listen(getCorrectEventName(window, 'animationend'), this.handleAnimationEnd_);
            this.installPropertyChangeHooks_();
        };
        MDCCheckbox.prototype.destroy = function () {
            this.ripple_.destroy();
            this.nativeControl_.removeEventListener('change', this.handleChange_);
            this.unlisten(getCorrectEventName(window, 'animationend'), this.handleAnimationEnd_);
            this.uninstallPropertyChangeHooks_();
            _super.prototype.destroy.call(this);
        };
        MDCCheckbox.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = {
                addClass: function (className) { return _this.root_.classList.add(className); },
                forceLayout: function () { return _this.root_.offsetWidth; },
                hasNativeControl: function () { return !!_this.nativeControl_; },
                isAttachedToDOM: function () { return Boolean(_this.root_.parentNode); },
                isChecked: function () { return _this.checked; },
                isIndeterminate: function () { return _this.indeterminate; },
                removeClass: function (className) { return _this.root_.classList.remove(className); },
                removeNativeControlAttr: function (attr) { return _this.nativeControl_.removeAttribute(attr); },
                setNativeControlAttr: function (attr, value) { return _this.nativeControl_.setAttribute(attr, value); },
                setNativeControlDisabled: function (disabled) { return _this.nativeControl_.disabled = disabled; },
            };
            return new MDCCheckboxFoundation(adapter);
        };
        MDCCheckbox.prototype.createRipple_ = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            var adapter = __assign({}, MDCRipple.createAdapter(this), { deregisterInteractionHandler: function (evtType, handler) { return _this.nativeControl_.removeEventListener(evtType, handler, applyPassive()); }, isSurfaceActive: function () { return matches(_this.nativeControl_, ':active'); }, isUnbounded: function () { return true; }, registerInteractionHandler: function (evtType, handler) { return _this.nativeControl_.addEventListener(evtType, handler, applyPassive()); } });
            return new MDCRipple(this.root_, new MDCRippleFoundation(adapter));
        };
        MDCCheckbox.prototype.installPropertyChangeHooks_ = function () {
            var _this = this;
            var nativeCb = this.nativeControl_;
            var cbProto = Object.getPrototypeOf(nativeCb);
            CB_PROTO_PROPS.forEach(function (controlState) {
                var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
                // We have to check for this descriptor, since some browsers (Safari) don't support its return.
                // See: https://bugs.webkit.org/show_bug.cgi?id=49739
                if (!validDescriptor(desc)) {
                    return;
                }
                // Type cast is needed for compatibility with Closure Compiler.
                var nativeGetter = desc.get;
                var nativeCbDesc = {
                    configurable: desc.configurable,
                    enumerable: desc.enumerable,
                    get: nativeGetter,
                    set: function (state) {
                        desc.set.call(nativeCb, state);
                        _this.foundation_.handleChange();
                    },
                };
                Object.defineProperty(nativeCb, controlState, nativeCbDesc);
            });
        };
        MDCCheckbox.prototype.uninstallPropertyChangeHooks_ = function () {
            var nativeCb = this.nativeControl_;
            var cbProto = Object.getPrototypeOf(nativeCb);
            CB_PROTO_PROPS.forEach(function (controlState) {
                var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
                if (!validDescriptor(desc)) {
                    return;
                }
                Object.defineProperty(nativeCb, controlState, desc);
            });
        };
        Object.defineProperty(MDCCheckbox.prototype, "nativeControl_", {
            get: function () {
                var NATIVE_CONTROL_SELECTOR = MDCCheckboxFoundation.strings.NATIVE_CONTROL_SELECTOR;
                var el = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
                if (!el) {
                    throw new Error("Checkbox component requires a " + NATIVE_CONTROL_SELECTOR + " element");
                }
                return el;
            },
            enumerable: true,
            configurable: true
        });
        return MDCCheckbox;
    }(MDCComponent));
    function validDescriptor(inputPropDesc) {
        return !!inputPropDesc && typeof inputPropDesc.set === 'function';
    }

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$2 = {
        CELL: 'mdc-data-table__cell',
        CELL_NUMERIC: 'mdc-data-table__cell--numeric',
        CONTENT: 'mdc-data-table__content',
        HEADER_ROW: 'mdc-data-table__header-row',
        HEADER_ROW_CHECKBOX: 'mdc-data-table__header-row-checkbox',
        ROOT: 'mdc-data-table',
        ROW: 'mdc-data-table__row',
        ROW_CHECKBOX: 'mdc-data-table__row-checkbox',
        ROW_SELECTED: 'mdc-data-table__row--selected',
    };
    var strings$2 = {
        ARIA_SELECTED: 'aria-selected',
        DATA_ROW_ID_ATTR: 'data-row-id',
        HEADER_ROW_CHECKBOX_SELECTOR: "." + cssClasses$2.HEADER_ROW_CHECKBOX,
        ROW_CHECKBOX_SELECTOR: "." + cssClasses$2.ROW_CHECKBOX,
        ROW_SELECTED_SELECTOR: "." + cssClasses$2.ROW_SELECTED,
        ROW_SELECTOR: "." + cssClasses$2.ROW,
    };
    var events = {
        ROW_SELECTION_CHANGED: 'MDCDataTable:rowSelectionChanged',
        SELECTED_ALL: 'MDCDataTable:selectedAll',
        UNSELECTED_ALL: 'MDCDataTable:unselectedAll',
    };

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCDataTableFoundation = /** @class */ (function (_super) {
        __extends(MDCDataTableFoundation, _super);
        function MDCDataTableFoundation(adapter) {
            return _super.call(this, __assign({}, MDCDataTableFoundation.defaultAdapter, adapter)) || this;
        }
        Object.defineProperty(MDCDataTableFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClassAtRowIndex: function () { return undefined; },
                    getRowCount: function () { return 0; },
                    getRowElements: function () { return []; },
                    getRowIdAtIndex: function () { return ''; },
                    getRowIndexByChildElement: function () { return 0; },
                    getSelectedRowCount: function () { return 0; },
                    isCheckboxAtRowIndexChecked: function () { return false; },
                    isHeaderRowCheckboxChecked: function () { return false; },
                    isRowsSelectable: function () { return false; },
                    notifyRowSelectionChanged: function () { return undefined; },
                    notifySelectedAll: function () { return undefined; },
                    notifyUnselectedAll: function () { return undefined; },
                    registerHeaderRowCheckbox: function () { return undefined; },
                    registerRowCheckboxes: function () { return undefined; },
                    removeClassAtRowIndex: function () { return undefined; },
                    setAttributeAtRowIndex: function () { return undefined; },
                    setHeaderRowCheckboxChecked: function () { return undefined; },
                    setHeaderRowCheckboxIndeterminate: function () { return undefined; },
                    setRowCheckboxCheckedAtIndex: function () { return undefined; },
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
         * Use this if registering checkbox is synchronous.
         */
        MDCDataTableFoundation.prototype.layout = function () {
            if (this.adapter_.isRowsSelectable()) {
                this.adapter_.registerHeaderRowCheckbox();
                this.adapter_.registerRowCheckboxes();
                this.setHeaderRowCheckboxState_();
            }
        };
        /**
         * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
         * Use this if registering checkbox is asynchronous.
         */
        MDCDataTableFoundation.prototype.layoutAsync = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.adapter_.isRowsSelectable()) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.adapter_.registerHeaderRowCheckbox()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.adapter_.registerRowCheckboxes()];
                        case 2:
                            _a.sent();
                            this.setHeaderRowCheckboxState_();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return Returns array of row elements.
         */
        MDCDataTableFoundation.prototype.getRows = function () {
            return this.adapter_.getRowElements();
        };
        /**
         * Sets selected row ids. Overwrites previously selected rows.
         * @param rowIds Array of row ids that needs to be selected.
         */
        MDCDataTableFoundation.prototype.setSelectedRowIds = function (rowIds) {
            for (var rowIndex = 0; rowIndex < this.adapter_.getRowCount(); rowIndex++) {
                var rowId = this.adapter_.getRowIdAtIndex(rowIndex);
                var isSelected = false;
                if (rowId && rowIds.indexOf(rowId) >= 0) {
                    isSelected = true;
                }
                this.adapter_.setRowCheckboxCheckedAtIndex(rowIndex, isSelected);
                this.selectRowAtIndex_(rowIndex, isSelected);
            }
            this.setHeaderRowCheckboxState_();
        };
        /**
         * @return Returns array of selected row ids.
         */
        MDCDataTableFoundation.prototype.getSelectedRowIds = function () {
            var selectedRowIds = [];
            for (var rowIndex = 0; rowIndex < this.adapter_.getRowCount(); rowIndex++) {
                if (this.adapter_.isCheckboxAtRowIndexChecked(rowIndex)) {
                    selectedRowIds.push(this.adapter_.getRowIdAtIndex(rowIndex));
                }
            }
            return selectedRowIds;
        };
        /**
         * Handles header row checkbox change event.
         */
        MDCDataTableFoundation.prototype.handleHeaderRowCheckboxChange = function () {
            var isHeaderChecked = this.adapter_.isHeaderRowCheckboxChecked();
            for (var rowIndex = 0; rowIndex < this.adapter_.getRowCount(); rowIndex++) {
                this.adapter_.setRowCheckboxCheckedAtIndex(rowIndex, isHeaderChecked);
                this.selectRowAtIndex_(rowIndex, isHeaderChecked);
            }
            if (isHeaderChecked) {
                this.adapter_.notifySelectedAll();
            }
            else {
                this.adapter_.notifyUnselectedAll();
            }
        };
        /**
         * Handles change event originated from row checkboxes.
         */
        MDCDataTableFoundation.prototype.handleRowCheckboxChange = function (event) {
            var rowIndex = this.adapter_.getRowIndexByChildElement(event.target);
            if (rowIndex === -1) {
                return;
            }
            var selected = this.adapter_.isCheckboxAtRowIndexChecked(rowIndex);
            this.selectRowAtIndex_(rowIndex, selected);
            this.setHeaderRowCheckboxState_();
            var rowId = this.adapter_.getRowIdAtIndex(rowIndex);
            this.adapter_.notifyRowSelectionChanged({ rowId: rowId, rowIndex: rowIndex, selected: selected });
        };
        /**
         * Updates header row checkbox state based on number of rows selected.
         */
        MDCDataTableFoundation.prototype.setHeaderRowCheckboxState_ = function () {
            if (this.adapter_.getSelectedRowCount() === this.adapter_.getRowCount()) {
                this.adapter_.setHeaderRowCheckboxChecked(true);
                this.adapter_.setHeaderRowCheckboxIndeterminate(false);
            }
            else if (this.adapter_.getSelectedRowCount() === 0) {
                this.adapter_.setHeaderRowCheckboxIndeterminate(false);
                this.adapter_.setHeaderRowCheckboxChecked(false);
            }
            else {
                this.adapter_.setHeaderRowCheckboxIndeterminate(true);
                this.adapter_.setHeaderRowCheckboxChecked(false);
            }
        };
        /**
         * Sets the attributes of row element based on selection state.
         */
        MDCDataTableFoundation.prototype.selectRowAtIndex_ = function (rowIndex, selected) {
            if (selected) {
                this.adapter_.addClassAtRowIndex(rowIndex, cssClasses$2.ROW_SELECTED);
                this.adapter_.setAttributeAtRowIndex(rowIndex, strings$2.ARIA_SELECTED, 'true');
            }
            else {
                this.adapter_.removeClassAtRowIndex(rowIndex, cssClasses$2.ROW_SELECTED);
                this.adapter_.setAttributeAtRowIndex(rowIndex, strings$2.ARIA_SELECTED, 'false');
            }
        };
        return MDCDataTableFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCDataTable = /** @class */ (function (_super) {
        __extends(MDCDataTable, _super);
        function MDCDataTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCDataTable.attachTo = function (root) {
            return new MDCDataTable(root);
        };
        MDCDataTable.prototype.initialize = function (checkboxFactory) {
            if (checkboxFactory === void 0) { checkboxFactory = function (el) { return new MDCCheckbox(el); }; }
            this.checkboxFactory_ = checkboxFactory;
        };
        MDCDataTable.prototype.initialSyncWithDOM = function () {
            var _this = this;
            this.headerRow_ = this.root_.querySelector("." + cssClasses$2.HEADER_ROW);
            this.handleHeaderRowCheckboxChange_ = function () { return _this.foundation_.handleHeaderRowCheckboxChange(); };
            this.headerRow_.addEventListener('change', this.handleHeaderRowCheckboxChange_);
            this.content_ = this.root_.querySelector("." + cssClasses$2.CONTENT);
            this.handleRowCheckboxChange_ = function (event) { return _this.foundation_.handleRowCheckboxChange(event); };
            this.content_.addEventListener('change', this.handleRowCheckboxChange_);
            this.layout();
        };
        /**
         * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
         */
        MDCDataTable.prototype.layout = function () {
            this.foundation_.layout();
        };
        /**
         * @return Returns array of row elements.
         */
        MDCDataTable.prototype.getRows = function () {
            return this.foundation_.getRows();
        };
        /**
         * @return Returns array of selected row ids.
         */
        MDCDataTable.prototype.getSelectedRowIds = function () {
            return this.foundation_.getSelectedRowIds();
        };
        /**
         * Sets selected row ids. Overwrites previously selected rows.
         * @param rowIds Array of row ids that needs to be selected.
         */
        MDCDataTable.prototype.setSelectedRowIds = function (rowIds) {
            this.foundation_.setSelectedRowIds(rowIds);
        };
        MDCDataTable.prototype.destroy = function () {
            this.headerRow_.removeEventListener('change', this.handleHeaderRowCheckboxChange_);
            this.content_.removeEventListener('change', this.handleRowCheckboxChange_);
            this.headerRowCheckbox_.destroy();
            this.rowCheckboxList_.forEach(function (checkbox) { return checkbox.destroy(); });
        };
        MDCDataTable.prototype.getDefaultFoundation = function () {
            var _this = this;
            // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
            // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            var adapter = {
                addClassAtRowIndex: function (rowIndex, className) { return _this.getRows()[rowIndex].classList.add(className); },
                getRowCount: function () { return _this.getRows().length; },
                getRowElements: function () { return [].slice.call(_this.root_.querySelectorAll(strings$2.ROW_SELECTOR)); },
                getRowIdAtIndex: function (rowIndex) { return _this.getRows()[rowIndex].getAttribute(strings$2.DATA_ROW_ID_ATTR); },
                getRowIndexByChildElement: function (el) {
                    return _this.getRows().indexOf(closest(el, strings$2.ROW_SELECTOR));
                },
                getSelectedRowCount: function () { return _this.root_.querySelectorAll(strings$2.ROW_SELECTED_SELECTOR).length; },
                isCheckboxAtRowIndexChecked: function (rowIndex) { return _this.rowCheckboxList_[rowIndex].checked; },
                isHeaderRowCheckboxChecked: function () { return _this.headerRowCheckbox_.checked; },
                isRowsSelectable: function () { return !!_this.root_.querySelector(strings$2.ROW_CHECKBOX_SELECTOR); },
                notifyRowSelectionChanged: function (data) {
                    _this.emit(events.ROW_SELECTION_CHANGED, {
                        row: _this.getRowByIndex_(data.rowIndex),
                        rowId: _this.getRowIdByIndex_(data.rowIndex),
                        rowIndex: data.rowIndex,
                        selected: data.selected,
                    }, 
                    /** shouldBubble */ true);
                },
                notifySelectedAll: function () { return _this.emit(events.SELECTED_ALL, {}, /** shouldBubble */ true); },
                notifyUnselectedAll: function () { return _this.emit(events.UNSELECTED_ALL, {}, /** shouldBubble */ true); },
                registerHeaderRowCheckbox: function () {
                    if (_this.headerRowCheckbox_) {
                        _this.headerRowCheckbox_.destroy();
                    }
                    var checkboxEl = _this.root_.querySelector(strings$2.HEADER_ROW_CHECKBOX_SELECTOR);
                    _this.headerRowCheckbox_ = _this.checkboxFactory_(checkboxEl);
                },
                registerRowCheckboxes: function () {
                    if (_this.rowCheckboxList_) {
                        _this.rowCheckboxList_.forEach(function (checkbox) { return checkbox.destroy(); });
                    }
                    _this.rowCheckboxList_ = [];
                    _this.getRows().forEach(function (rowEl) {
                        var checkbox = _this.checkboxFactory_(rowEl.querySelector(strings$2.ROW_CHECKBOX_SELECTOR));
                        _this.rowCheckboxList_.push(checkbox);
                    });
                },
                removeClassAtRowIndex: function (rowIndex, className) {
                    _this.getRows()[rowIndex].classList.remove(className);
                },
                setAttributeAtRowIndex: function (rowIndex, attr, value) {
                    _this.getRows()[rowIndex].setAttribute(attr, value);
                },
                setHeaderRowCheckboxChecked: function (checked) {
                    _this.headerRowCheckbox_.checked = checked;
                },
                setHeaderRowCheckboxIndeterminate: function (indeterminate) {
                    _this.headerRowCheckbox_.indeterminate = indeterminate;
                },
                setRowCheckboxCheckedAtIndex: function (rowIndex, checked) {
                    _this.rowCheckboxList_[rowIndex].checked = checked;
                },
            };
            return new MDCDataTableFoundation(adapter);
        };
        MDCDataTable.prototype.getRowByIndex_ = function (index) {
            return this.getRows()[index];
        };
        MDCDataTable.prototype.getRowIdByIndex_ = function (index) {
            return this.getRowByIndex_(index).getAttribute(strings$2.DATA_ROW_ID_ATTR);
        };
        return MDCDataTable;
    }(MDCComponent));

    function forwardEventsBuilder(component, additionalEvents = []) {
      const events = [
        'focus', 'blur',
        'fullscreenchange', 'fullscreenerror', 'scroll',
        'cut', 'copy', 'paste',
        'keydown', 'keypress', 'keyup',
        'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel',
        'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
        'touchcancel', 'touchend', 'touchmove', 'touchstart',
        'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture',
        ...additionalEvents
      ];

      function forward(e) {
        bubble(component, e);
      }

      return node => {
        const destructors = [];

        for (let i = 0; i < events.length; i++) {
          destructors.push(listen(node, events[i], forward));
        }

        return {
          destroy: () => {
            for (let i = 0; i < destructors.length; i++) {
              destructors[i]();
            }
          }
        }
      };
    }

    function exclude(obj, keys) {
      let names = Object.getOwnPropertyNames(obj);
      const newObj = {};

      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const cashIndex = name.indexOf('$');
        if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
          continue;
        }
        if (keys.indexOf(name) !== -1) {
          continue;
        }
        newObj[name] = obj[name];
      }

      return newObj;
    }

    function prefixFilter(obj, prefix) {
      let names = Object.getOwnPropertyNames(obj);
      const newObj = {};

      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        if (name.substring(0, prefix.length) === prefix) {
          newObj[name.substring(prefix.length)] = obj[name];
        }
      }

      return newObj;
    }

    function useActions(node, actions) {
      let objects = [];

      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          const isArray = Array.isArray(actions[i]);
          const action = isArray ? actions[i][0] : actions[i];
          if (isArray && actions[i].length > 1) {
            objects.push(action(node, actions[i][1]));
          } else {
            objects.push(action(node));
          }
        }
      }

      return {
        update(actions) {
          if ((actions && actions.length || 0) != objects.length) {
            throw new Error('You must not change the length of an actions array.');
          }

          if (actions) {
            for (let i = 0; i < actions.length; i++) {
              if (objects[i] && 'update' in objects[i]) {
                const isArray = Array.isArray(actions[i]);
                if (isArray && actions[i].length > 1) {
                  objects[i].update(actions[i][1]);
                } else {
                  objects[i].update();
                }
              }
            }
          }
        },

        destroy() {
          for (let i = 0; i < objects.length; i++) {
            if (objects[i] && 'destroy' in objects[i]) {
              objects[i].destroy();
            }
          }
        }
      }
    }

    /* node_modules/@smui/data-table/DataTable.svelte generated by Svelte v3.24.1 */

    const { Error: Error_1 } = globals;
    const file$1 = "node_modules/@smui/data-table/DataTable.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let table;
    	let table_class_value;
    	let useActions_action;
    	let div_class_value;
    	let useActions_action_1;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

    	let table_levels = [
    		{
    			class: table_class_value = "mdc-data-table__table " + /*table$class*/ ctx[3]
    		},
    		prefixFilter(/*$$props*/ ctx[7], "table$")
    	];

    	let table_data = {};

    	for (let i = 0; i < table_levels.length; i += 1) {
    		table_data = assign(table_data, table_levels[i]);
    	}

    	let div_levels = [
    		{
    			class: div_class_value = "mdc-data-table " + /*className*/ ctx[1]
    		},
    		exclude(/*$$props*/ ctx[7], ["use", "class", "table$"])
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			table = element("table");
    			if (default_slot) default_slot.c();
    			set_attributes(table, table_data);
    			add_location(table, file$1, 10, 2, 308);
    			set_attributes(div, div_data);
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, table);

    			if (default_slot) {
    				default_slot.m(table, null);
    			}

    			/*div_binding*/ ctx[14](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, table, /*table$use*/ ctx[2])),
    					action_destroyer(useActions_action_1 = useActions.call(null, div, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[5].call(null, div)),
    					listen_dev(div, "MDCDataTable:rowSelectionChanged", /*handleChange*/ ctx[6], false, false, false),
    					listen_dev(div, "MDCDataTable:selectedAll", /*handleChange*/ ctx[6], false, false, false),
    					listen_dev(div, "MDCDataTable:unselectedAll", /*handleChange*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4096) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[12], dirty, null, null);
    				}
    			}

    			set_attributes(table, table_data = get_spread_update(table_levels, [
    				(!current || dirty & /*table$class*/ 8 && table_class_value !== (table_class_value = "mdc-data-table__table " + /*table$class*/ ctx[3])) && { class: table_class_value },
    				dirty & /*$$props*/ 128 && prefixFilter(/*$$props*/ ctx[7], "table$")
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*table$use*/ 4) useActions_action.update.call(null, /*table$use*/ ctx[2]);

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty & /*className*/ 2 && div_class_value !== (div_class_value = "mdc-data-table " + /*className*/ ctx[1])) && { class: div_class_value },
    				dirty & /*$$props*/ 128 && exclude(/*$$props*/ ctx[7], ["use", "class", "table$"])
    			]));

    			if (useActions_action_1 && is_function(useActions_action_1.update) && dirty & /*use*/ 1) useActions_action_1.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[14](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	if (events.ROW_SELECTION_CHANGED !== "MDCDataTable:rowSelectionChanged" || events.SELECTED_ALL !== "MDCDataTable:selectedAll" || events.UNSELECTED_ALL !== "MDCDataTable:unselectedAll") {
    		throw new Error("MDC API has changed!");
    	}

    	const forwardEvents = forwardEventsBuilder(get_current_component(), [
    		"MDCDataTable:rowSelectionChanged",
    		"MDCDataTable:selectedAll",
    		"MDCDataTable:unselectedAll"
    	]);

    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	let { table$use = [] } = $$props;
    	let { table$class = "" } = $$props;
    	let element;
    	let dataTable;
    	let changeHandlers = [];
    	let checkBoxHeaderPromiseResolve;
    	let checkBoxHeaderPromise = new Promise(resolve => checkBoxHeaderPromiseResolve = resolve);
    	let checkBoxListPromiseResolve;
    	let checkBoxListPromise = new Promise(resolve => checkBoxListPromiseResolve = resolve);
    	let addLayoutListener = getContext("SMUI:addLayoutListener");
    	let removeLayoutListener;
    	setContext("SMUI:generic:input:addChangeHandler", addChangeHandler);
    	setContext("SMUI:checkbox:context", "data-table");
    	setContext("SMUI:checkbox:instantiate", false);
    	setContext("SMUI:checkbox:getInstance", getCheckboxInstancePromise);

    	if (addLayoutListener) {
    		removeLayoutListener = addLayoutListener(layout);
    	}

    	onMount(async () => {
    		dataTable = new MDCDataTable(element);
    		checkBoxHeaderPromiseResolve(dataTable.headerRowCheckbox_);
    		checkBoxListPromiseResolve(dataTable.rowCheckboxList_);

    		// Workaround for a bug in MDC DataTable where a table with no checkboxes
    		// calls destroy on them anyway.
    		if (!dataTable.headerRowCheckbox_) {
    			dataTable.headerRowCheckbox_ = {
    				destroy() {
    					
    				}
    			};
    		}

    		if (!dataTable.rowCheckboxList_) {
    			dataTable.rowCheckboxList_ = [];
    		}
    	});

    	onDestroy(() => {
    		dataTable && dataTable.destroy();

    		if (removeLayoutListener) {
    			removeLayoutListener();
    		}
    	});

    	function getCheckboxInstancePromise(header) {
    		return header ? checkBoxHeaderPromise : checkBoxListPromise;
    	}

    	function handleChange() {
    		for (let i = 0; i < changeHandlers.length; i++) {
    			changeHandlers[i]();
    		}
    	}

    	function addChangeHandler(handler) {
    		changeHandlers.push(handler);
    	}

    	function layout(...args) {
    		return dataTable.layout(...args);
    	}

    	function getRows(...args) {
    		return dataTable.getRows(...args);
    	}

    	function getSelectedRowIds(...args) {
    		return dataTable.getSelectedRowIds(...args);
    	}

    	function setSelectedRowIds(...args) {
    		return dataTable.setSelectedRowIds(...args);
    	}

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("DataTable", $$slots, ['default']);

    	function div_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			element = $$value;
    			$$invalidate(4, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("table$use" in $$new_props) $$invalidate(2, table$use = $$new_props.table$use);
    		if ("table$class" in $$new_props) $$invalidate(3, table$class = $$new_props.table$class);
    		if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCDataTable,
    		events,
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		prefixFilter,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		table$use,
    		table$class,
    		element,
    		dataTable,
    		changeHandlers,
    		checkBoxHeaderPromiseResolve,
    		checkBoxHeaderPromise,
    		checkBoxListPromiseResolve,
    		checkBoxListPromise,
    		addLayoutListener,
    		removeLayoutListener,
    		getCheckboxInstancePromise,
    		handleChange,
    		addChangeHandler,
    		layout,
    		getRows,
    		getSelectedRowIds,
    		setSelectedRowIds
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    		if ("table$use" in $$props) $$invalidate(2, table$use = $$new_props.table$use);
    		if ("table$class" in $$props) $$invalidate(3, table$class = $$new_props.table$class);
    		if ("element" in $$props) $$invalidate(4, element = $$new_props.element);
    		if ("dataTable" in $$props) dataTable = $$new_props.dataTable;
    		if ("changeHandlers" in $$props) changeHandlers = $$new_props.changeHandlers;
    		if ("checkBoxHeaderPromiseResolve" in $$props) checkBoxHeaderPromiseResolve = $$new_props.checkBoxHeaderPromiseResolve;
    		if ("checkBoxHeaderPromise" in $$props) checkBoxHeaderPromise = $$new_props.checkBoxHeaderPromise;
    		if ("checkBoxListPromiseResolve" in $$props) checkBoxListPromiseResolve = $$new_props.checkBoxListPromiseResolve;
    		if ("checkBoxListPromise" in $$props) checkBoxListPromise = $$new_props.checkBoxListPromise;
    		if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    		if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);

    	return [
    		use,
    		className,
    		table$use,
    		table$class,
    		element,
    		forwardEvents,
    		handleChange,
    		$$props,
    		layout,
    		getRows,
    		getSelectedRowIds,
    		setSelectedRowIds,
    		$$scope,
    		$$slots,
    		div_binding
    	];
    }

    class DataTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			use: 0,
    			class: 1,
    			table$use: 2,
    			table$class: 3,
    			layout: 8,
    			getRows: 9,
    			getSelectedRowIds: 10,
    			setSelectedRowIds: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DataTable",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get use() {
    		throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get table$use() {
    		throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set table$use(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get table$class() {
    		throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set table$class(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layout() {
    		return this.$$.ctx[8];
    	}

    	set layout(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getRows() {
    		return this.$$.ctx[9];
    	}

    	set getRows(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getSelectedRowIds() {
    		return this.$$.ctx[10];
    	}

    	set getSelectedRowIds(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setSelectedRowIds() {
    		return this.$$.ctx[11];
    	}

    	set setSelectedRowIds(value) {
    		throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/data-table/Head.svelte generated by Svelte v3.24.1 */
    const file$2 = "node_modules/@smui/data-table/Head.svelte";

    function create_fragment$4(ctx) {
    	let thead;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	let thead_levels = [exclude(/*$$props*/ ctx[2], ["use"])];
    	let thead_data = {};

    	for (let i = 0; i < thead_levels.length; i += 1) {
    		thead_data = assign(thead_data, thead_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			if (default_slot) default_slot.c();
    			set_attributes(thead, thead_data);
    			add_location(thead, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);

    			if (default_slot) {
    				default_slot.m(thead, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, thead, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[1].call(null, thead))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			set_attributes(thead, thead_data = get_spread_update(thead_levels, [dirty & /*$$props*/ 4 && exclude(/*$$props*/ ctx[2], ["use"])]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	setContext("SMUI:data-table:row:header", true);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Head", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [use, forwardEvents, $$props, $$scope, $$slots];
    }

    class Head extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { use: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Head",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get use() {
    		throw new Error("<Head>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Head>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/data-table/Body.svelte generated by Svelte v3.24.1 */
    const file$3 = "node_modules/@smui/data-table/Body.svelte";

    function create_fragment$5(ctx) {
    	let tbody;
    	let tbody_class_value;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	let tbody_levels = [
    		{
    			class: tbody_class_value = "mdc-data-table__content " + /*className*/ ctx[1]
    		},
    		exclude(/*$$props*/ ctx[3], ["use", "class"])
    	];

    	let tbody_data = {};

    	for (let i = 0; i < tbody_levels.length; i += 1) {
    		tbody_data = assign(tbody_data, tbody_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			tbody = element("tbody");
    			if (default_slot) default_slot.c();
    			set_attributes(tbody, tbody_data);
    			add_location(tbody, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tbody, anchor);

    			if (default_slot) {
    				default_slot.m(tbody, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, tbody, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[2].call(null, tbody))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 16) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
    				}
    			}

    			set_attributes(tbody, tbody_data = get_spread_update(tbody_levels, [
    				(!current || dirty & /*className*/ 2 && tbody_class_value !== (tbody_class_value = "mdc-data-table__content " + /*className*/ ctx[1])) && { class: tbody_class_value },
    				dirty & /*$$props*/ 8 && exclude(/*$$props*/ ctx[3], ["use", "class"])
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tbody);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	setContext("SMUI:data-table:row:header", false);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Body", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("$$scope" in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use,
    		className
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [use, className, forwardEvents, $$props, $$scope, $$slots];
    }

    class Body extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { use: 0, class: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Body",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get use() {
    		throw new Error("<Body>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Body>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Body>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Body>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/data-table/Row.svelte generated by Svelte v3.24.1 */
    const file$4 = "node_modules/@smui/data-table/Row.svelte";

    function create_fragment$6(ctx) {
    	let tr;
    	let tr_class_value;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	let tr_levels = [
    		{
    			class: tr_class_value = "\n    " + /*className*/ ctx[1] + "\n    " + (/*header*/ ctx[5] ? "mdc-data-table__header-row" : "") + "\n    " + (!/*header*/ ctx[5] ? "mdc-data-table__row" : "") + "\n    " + (!/*header*/ ctx[5] && /*selected*/ ctx[3]
    			? "mdc-data-table__row--selected"
    			: "") + "\n  "
    		},
    		/*selected*/ ctx[3] !== undefined
    		? {
    				"aria-selected": /*selected*/ ctx[3] ? "true" : "false"
    			}
    		: {},
    		exclude(/*$$props*/ ctx[6], ["use", "class"])
    	];

    	let tr_data = {};

    	for (let i = 0; i < tr_levels.length; i += 1) {
    		tr_data = assign(tr_data, tr_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if (default_slot) default_slot.c();
    			set_attributes(tr, tr_data);
    			add_location(tr, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);

    			if (default_slot) {
    				default_slot.m(tr, null);
    			}

    			/*tr_binding*/ ctx[9](tr);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, tr, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[4].call(null, tr))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}

    			set_attributes(tr, tr_data = get_spread_update(tr_levels, [
    				(!current || dirty & /*className, selected*/ 10 && tr_class_value !== (tr_class_value = "\n    " + /*className*/ ctx[1] + "\n    " + (/*header*/ ctx[5] ? "mdc-data-table__header-row" : "") + "\n    " + (!/*header*/ ctx[5] ? "mdc-data-table__row" : "") + "\n    " + (!/*header*/ ctx[5] && /*selected*/ ctx[3]
    				? "mdc-data-table__row--selected"
    				: "") + "\n  ")) && { class: tr_class_value },
    				dirty & /*selected*/ 8 && (/*selected*/ ctx[3] !== undefined
    				? {
    						"aria-selected": /*selected*/ ctx[3] ? "true" : "false"
    					}
    				: {}),
    				dirty & /*$$props*/ 64 && exclude(/*$$props*/ ctx[6], ["use", "class"])
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (default_slot) default_slot.d(detaching);
    			/*tr_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	let element;
    	let header = getContext("SMUI:data-table:row:header");
    	let selected = undefined;
    	setContext("SMUI:data-table:row:getIndex", getIndex);
    	setContext("SMUI:generic:input:setChecked", setChecked);

    	function setChecked(checked) {
    		$$invalidate(3, selected = checked);
    	}

    	function getIndex() {
    		let i = 0;

    		if (element) {
    			let el = element;

    			while (el.previousSibling) {
    				el = el.previousSibling;

    				if (el.nodeType === 1) {
    					i++;
    				}
    			}
    		}

    		return i;
    	}

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Row", $$slots, ['default']);

    	function tr_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("$$scope" in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		element,
    		header,
    		selected,
    		setChecked,
    		getIndex
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    		if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    		if ("header" in $$props) $$invalidate(5, header = $$new_props.header);
    		if ("selected" in $$props) $$invalidate(3, selected = $$new_props.selected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);

    	return [
    		use,
    		className,
    		element,
    		selected,
    		forwardEvents,
    		header,
    		$$props,
    		$$scope,
    		$$slots,
    		tr_binding
    	];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { use: 0, class: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get use() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/data-table/Cell.svelte generated by Svelte v3.24.1 */
    const file$5 = "node_modules/@smui/data-table/Cell.svelte";

    // (14:0) {:else}
    function create_else_block$1(ctx) {
    	let td;
    	let td_class_value;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	let td_levels = [
    		{
    			class: td_class_value = "\n      mdc-data-table__cell\n      " + /*className*/ ctx[1] + "\n      " + (/*numeric*/ ctx[2]
    			? "mdc-data-table__cell--numeric"
    			: "") + "\n      " + (/*checkbox*/ ctx[3]
    			? "mdc-data-table__cell--checkbox"
    			: "") + "\n    "
    		},
    		/*roleProp*/ ctx[5],
    		/*scopeProp*/ ctx[6],
    		/*props*/ ctx[4]
    	];

    	let td_data = {};

    	for (let i = 0; i < td_levels.length; i += 1) {
    		td_data = assign(td_data, td_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			td = element("td");
    			if (default_slot) default_slot.c();
    			set_attributes(td, td_data);
    			add_location(td, file$5, 14, 2, 284);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);

    			if (default_slot) {
    				default_slot.m(td, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, td, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[7].call(null, td))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2048) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], dirty, null, null);
    				}
    			}

    			set_attributes(td, td_data = get_spread_update(td_levels, [
    				(!current || dirty & /*className, numeric, checkbox*/ 14 && td_class_value !== (td_class_value = "\n      mdc-data-table__cell\n      " + /*className*/ ctx[1] + "\n      " + (/*numeric*/ ctx[2]
    				? "mdc-data-table__cell--numeric"
    				: "") + "\n      " + (/*checkbox*/ ctx[3]
    				? "mdc-data-table__cell--checkbox"
    				: "") + "\n    ")) && { class: td_class_value },
    				dirty & /*roleProp*/ 32 && /*roleProp*/ ctx[5],
    				dirty & /*scopeProp*/ 64 && /*scopeProp*/ ctx[6],
    				dirty & /*props*/ 16 && /*props*/ ctx[4]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(14:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if header}
    function create_if_block$1(ctx) {
    	let th;
    	let th_class_value;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	let th_levels = [
    		{
    			class: th_class_value = "\n      mdc-data-table__header-cell\n      " + /*className*/ ctx[1] + "\n      " + (/*checkbox*/ ctx[3]
    			? "mdc-data-table__header-cell--checkbox"
    			: "") + "\n    "
    		},
    		/*roleProp*/ ctx[5],
    		/*scopeProp*/ ctx[6],
    		/*props*/ ctx[4]
    	];

    	let th_data = {};

    	for (let i = 0; i < th_levels.length; i += 1) {
    		th_data = assign(th_data, th_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			th = element("th");
    			if (default_slot) default_slot.c();
    			set_attributes(th, th_data);
    			add_location(th, file$5, 1, 2, 15);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);

    			if (default_slot) {
    				default_slot.m(th, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, th, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[7].call(null, th))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2048) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], dirty, null, null);
    				}
    			}

    			set_attributes(th, th_data = get_spread_update(th_levels, [
    				(!current || dirty & /*className, checkbox*/ 10 && th_class_value !== (th_class_value = "\n      mdc-data-table__header-cell\n      " + /*className*/ ctx[1] + "\n      " + (/*checkbox*/ ctx[3]
    				? "mdc-data-table__header-cell--checkbox"
    				: "") + "\n    ")) && { class: th_class_value },
    				dirty & /*roleProp*/ 32 && /*roleProp*/ ctx[5],
    				dirty & /*scopeProp*/ 64 && /*scopeProp*/ ctx[6],
    				dirty & /*props*/ 16 && /*props*/ ctx[4]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(1:0) {#if header}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*header*/ ctx[8]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let header = getContext("SMUI:data-table:row:header");
    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	let { role = header ? "columnheader" : undefined } = $$props;
    	let { scope = header ? "col" : undefined } = $$props;
    	let { numeric = false } = $$props;
    	let { checkbox = false } = $$props;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Cell", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("role" in $$new_props) $$invalidate(9, role = $$new_props.role);
    		if ("scope" in $$new_props) $$invalidate(10, scope = $$new_props.scope);
    		if ("numeric" in $$new_props) $$invalidate(2, numeric = $$new_props.numeric);
    		if ("checkbox" in $$new_props) $$invalidate(3, checkbox = $$new_props.checkbox);
    		if ("$$scope" in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		header,
    		use,
    		className,
    		role,
    		scope,
    		numeric,
    		checkbox,
    		props,
    		roleProp,
    		scopeProp
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ("header" in $$props) $$invalidate(8, header = $$new_props.header);
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    		if ("role" in $$props) $$invalidate(9, role = $$new_props.role);
    		if ("scope" in $$props) $$invalidate(10, scope = $$new_props.scope);
    		if ("numeric" in $$props) $$invalidate(2, numeric = $$new_props.numeric);
    		if ("checkbox" in $$props) $$invalidate(3, checkbox = $$new_props.checkbox);
    		if ("props" in $$props) $$invalidate(4, props = $$new_props.props);
    		if ("roleProp" in $$props) $$invalidate(5, roleProp = $$new_props.roleProp);
    		if ("scopeProp" in $$props) $$invalidate(6, scopeProp = $$new_props.scopeProp);
    	};

    	let props;
    	let roleProp;
    	let scopeProp;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 $$invalidate(4, props = exclude($$props, ["use", "class", "numeric", "checkbox"]));

    		if ($$self.$$.dirty & /*role*/ 512) {
    			 $$invalidate(5, roleProp = role ? { role } : {});
    		}

    		if ($$self.$$.dirty & /*scope*/ 1024) {
    			 $$invalidate(6, scopeProp = scope ? { scope } : {});
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		use,
    		className,
    		numeric,
    		checkbox,
    		props,
    		roleProp,
    		scopeProp,
    		forwardEvents,
    		header,
    		role,
    		scope,
    		$$scope,
    		$$slots
    	];
    }

    class Cell extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			use: 0,
    			class: 1,
    			role: 9,
    			scope: 10,
    			numeric: 2,
    			checkbox: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cell",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get use() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scope() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scope(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get numeric() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set numeric(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checkbox() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checkbox(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = ".mdc-data-table__content {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.0178571429em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n.mdc-data-table {\n  background-color: #fff;\n  /* @alternate */\n  background-color: var(--mdc-theme-surface, #fff);\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: rgba(0, 0, 0, 0.12);\n  display: inline-flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  overflow-x: auto;\n}\n.mdc-data-table__row {\n  background-color: inherit;\n}\n\n.mdc-data-table__header-row {\n  background-color: inherit;\n}\n\n.mdc-data-table__row--selected {\n  background-color: rgba(98, 0, 238, 0.04);\n}\n\n.mdc-data-table__row {\n  border-top-color: rgba(0, 0, 0, 0.12);\n}\n\n.mdc-data-table__row {\n  border-top-width: 1px;\n  border-top-style: solid;\n}\n\n.mdc-data-table__row:not(.mdc-data-table__row--selected):hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n\n.mdc-data-table__header-cell {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mdc-data-table__cell {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mdc-data-table__header-row {\n  height: 56px;\n}\n\n.mdc-data-table__row {\n  height: 52px;\n}\n\n.mdc-data-table__cell,\n.mdc-data-table__header-cell {\n  padding-right: 16px;\n  padding-left: 16px;\n}\n\n.mdc-data-table__header-cell--checkbox,\n.mdc-data-table__cell--checkbox {\n  /* @noflip */\n  padding-left: 16px;\n  /* @noflip */\n  padding-right: 0;\n}\n[dir=rtl] .mdc-data-table__header-cell--checkbox, .mdc-data-table__header-cell--checkbox[dir=rtl],\n[dir=rtl] .mdc-data-table__cell--checkbox,\n.mdc-data-table__cell--checkbox[dir=rtl] {\n  /* @noflip */\n  padding-left: 0;\n  /* @noflip */\n  padding-right: 16px;\n}\n\n.mdc-data-table__table {\n  width: 100%;\n  border: 0;\n  white-space: nowrap;\n  border-collapse: collapse;\n}\n\n.mdc-data-table__cell {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.0178571429em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n.mdc-data-table__cell--numeric {\n  text-align: right;\n}\n[dir=rtl] .mdc-data-table__cell--numeric, .mdc-data-table__cell--numeric[dir=rtl] {\n  /* @noflip */\n  text-align: left;\n}\n\n.mdc-data-table__header-cell {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.375rem;\n  font-weight: 500;\n  letter-spacing: 0.0071428571em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  text-align: left;\n}\n[dir=rtl] .mdc-data-table__header-cell, .mdc-data-table__header-cell[dir=rtl] {\n  /* @noflip */\n  text-align: right;\n}\n\n.mdc-data-table__header-cell--numeric {\n  text-align: right;\n}\n[dir=rtl] .mdc-data-table__header-cell--numeric, .mdc-data-table__header-cell--numeric[dir=rtl] {\n  /* @noflip */\n  text-align: left;\n}\n\n.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background::before,\n.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background::before,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background::before,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background::before {\n  background-color: #6200ee;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background::before,\n.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background::before,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background::before,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background::before {\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--selected::before, .mdc-data-table__header-row-checkbox.mdc-checkbox--selected::after,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected::before,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected::after {\n  background-color: #6200ee;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-data-table__header-row-checkbox.mdc-checkbox--selected::before, .mdc-data-table__header-row-checkbox.mdc-checkbox--selected::after,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected::before,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:hover::before,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected:hover::before {\n  opacity: 0.04;\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus::before, .mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused::before,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus::before,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded)::after,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active::after,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded,\n.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::before, .mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::after,\n.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::before,\n.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::after {\n  background-color: #6200ee;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::before, .mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::after,\n.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::before,\n.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate) ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: rgba(0, 0, 0, 0.54);\n  background-color: transparent;\n}\n.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,\n.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {\n  border-color: #6200ee;\n  /* @alternate */\n  border-color: var(--mdc-theme-primary, #6200ee);\n  background-color: #6200ee;\n  /* @alternate */\n  background-color: var(--mdc-theme-primary, #6200ee);\n}\n@keyframes mdc-checkbox-fade-in-background-ubakzpb {\n  0% {\n    border-color: rgba(0, 0, 0, 0.54);\n    background-color: transparent;\n  }\n  50% {\n    border-color: #6200ee;\n    /* @alternate */\n    border-color: var(--mdc-theme-primary, #6200ee);\n    background-color: #6200ee;\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n@keyframes mdc-checkbox-fade-out-background-ubakzpb {\n  0%, 80% {\n    border-color: #6200ee;\n    /* @alternate */\n    border-color: var(--mdc-theme-primary, #6200ee);\n    background-color: #6200ee;\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n  100% {\n    border-color: rgba(0, 0, 0, 0.54);\n    background-color: transparent;\n  }\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background, .mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background {\n  animation-name: mdc-checkbox-fade-in-background-ubakzpb;\n}\n.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background, .mdc-data-table__header-row-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background,\n.mdc-data-table__row-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background {\n  animation-name: mdc-checkbox-fade-out-background-ubakzpb;\n}\n\n@keyframes mdc-checkbox-unchecked-checked-checkmark-path {\n  0%, 50% {\n    stroke-dashoffset: 29.7833385;\n  }\n  50% {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {\n  0%, 68.2% {\n    transform: scaleX(0);\n  }\n  68.2% {\n    animation-timing-function: cubic-bezier(0, 0, 0, 1);\n  }\n  100% {\n    transform: scaleX(1);\n  }\n}\n@keyframes mdc-checkbox-checked-unchecked-checkmark-path {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n    opacity: 1;\n    stroke-dashoffset: 0;\n  }\n  to {\n    opacity: 0;\n    stroke-dashoffset: -29.7833385;\n  }\n}\n@keyframes mdc-checkbox-checked-indeterminate-checkmark {\n  from {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(45deg);\n    opacity: 0;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-checked-checkmark {\n  from {\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n    transform: rotate(45deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(360deg);\n    opacity: 1;\n  }\n}\n@keyframes mdc-checkbox-checked-indeterminate-mixedmark {\n  from {\n    animation-timing-function: mdc-animation-deceleration-curve-timing-function;\n    transform: rotate(-45deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-checked-mixedmark {\n  from {\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(315deg);\n    opacity: 0;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {\n  0% {\n    animation-timing-function: linear;\n    transform: scaleX(1);\n    opacity: 1;\n  }\n  32.8%, 100% {\n    transform: scaleX(0);\n    opacity: 0;\n  }\n}\n.mdc-checkbox {\n  display: inline-block;\n  position: relative;\n  flex: 0 0 18px;\n  box-sizing: content-box;\n  width: 18px;\n  height: 18px;\n  line-height: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  vertical-align: bottom;\n}\n.mdc-checkbox .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background::before,\n.mdc-checkbox .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background::before {\n  background-color: #018786;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-checkbox .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background::before,\n.mdc-checkbox .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background::before {\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n.mdc-checkbox.mdc-checkbox--selected::before, .mdc-checkbox.mdc-checkbox--selected::after {\n  background-color: #018786;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-checkbox.mdc-checkbox--selected::before, .mdc-checkbox.mdc-checkbox--selected::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n.mdc-checkbox.mdc-checkbox--selected:hover::before {\n  opacity: 0.04;\n}\n.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus::before, .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::before, .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::after {\n  background-color: #018786;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::before, .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n\n.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: rgba(0, 0, 0, 0.54);\n  background-color: transparent;\n}\n\n.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {\n  border-color: #018786;\n  /* @alternate */\n  border-color: var(--mdc-theme-secondary, #018786);\n  background-color: #018786;\n  /* @alternate */\n  background-color: var(--mdc-theme-secondary, #018786);\n}\n\n@keyframes mdc-checkbox-fade-in-background-ubakzq0 {\n  0% {\n    border-color: rgba(0, 0, 0, 0.54);\n    background-color: transparent;\n  }\n  50% {\n    border-color: #018786;\n    /* @alternate */\n    border-color: var(--mdc-theme-secondary, #018786);\n    background-color: #018786;\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n@keyframes mdc-checkbox-fade-out-background-ubakzq0 {\n  0%, 80% {\n    border-color: #018786;\n    /* @alternate */\n    border-color: var(--mdc-theme-secondary, #018786);\n    background-color: #018786;\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n  100% {\n    border-color: rgba(0, 0, 0, 0.54);\n    background-color: transparent;\n  }\n}\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background, .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background {\n  animation-name: mdc-checkbox-fade-in-background-ubakzq0;\n}\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background, .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background {\n  animation-name: mdc-checkbox-fade-out-background-ubakzq0;\n}\n\n.mdc-checkbox__checkmark {\n  color: #fff;\n}\n\n.mdc-checkbox__mixedmark {\n  border-color: #fff;\n}\n\n.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: rgba(0, 0, 0, 0.26);\n}\n\n.mdc-checkbox__native-control[disabled]:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control[disabled]:indeterminate ~ .mdc-checkbox__background {\n  border-color: transparent;\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n@media screen and (-ms-high-contrast: active) {\n  .mdc-checkbox__mixedmark {\n    margin: 0 1px;\n  }\n}\n.mdc-checkbox--disabled {\n  cursor: default;\n  pointer-events: none;\n}\n\n.mdc-checkbox__background {\n  display: inline-flex;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 18px;\n  height: 18px;\n  border: 2px solid currentColor;\n  border-radius: 2px;\n  background-color: transparent;\n  pointer-events: none;\n  will-change: background-color, border-color;\n  transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n.mdc-checkbox__background .mdc-checkbox__background::before {\n  background-color: #000;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-checkbox__background .mdc-checkbox__background::before {\n    /* @alternate */\n    background-color: var(--mdc-theme-on-surface, #000);\n  }\n}\n\n.mdc-checkbox__checkmark {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0;\n  transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n.mdc-checkbox--upgraded .mdc-checkbox__checkmark {\n  opacity: 1;\n}\n\n.mdc-checkbox__checkmark-path {\n  transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n  stroke: currentColor;\n  stroke-width: 3.12px;\n  stroke-dashoffset: 29.7833385;\n  stroke-dasharray: 29.7833385;\n}\n\n.mdc-checkbox__mixedmark {\n  width: 100%;\n  height: 0;\n  transform: scaleX(0) rotate(0deg);\n  border-width: 1px;\n  border-style: solid;\n  opacity: 0;\n  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n\n.mdc-checkbox--upgraded .mdc-checkbox__background,\n.mdc-checkbox--upgraded .mdc-checkbox__checkmark,\n.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,\n.mdc-checkbox--upgraded .mdc-checkbox__mixedmark {\n  transition: none !important;\n}\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background, .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background, .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background, .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {\n  animation-duration: 180ms;\n  animation-timing-function: linear;\n}\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {\n  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {\n  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {\n  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {\n  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;\n  transition: none;\n}\n.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;\n  transition: none;\n}\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background .mdc-checkbox__checkmark-path,\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background .mdc-checkbox__checkmark-path {\n  stroke-dashoffset: 0;\n}\n\n.mdc-checkbox__background::before {\n  position: absolute;\n  transform: scale(0, 0);\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: \"\";\n  will-change: opacity, transform;\n  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n\n.mdc-checkbox__native-control:focus ~ .mdc-checkbox__background::before {\n  transform: scale(1);\n  opacity: 0.12;\n  transition: opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.mdc-checkbox__native-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n  cursor: inherit;\n}\n.mdc-checkbox__native-control:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background .mdc-checkbox__checkmark {\n  transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  opacity: 1;\n}\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background .mdc-checkbox__mixedmark {\n  transform: scaleX(1) rotate(-45deg);\n}\n\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background .mdc-checkbox__checkmark {\n  transform: rotate(45deg);\n  opacity: 0;\n  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background .mdc-checkbox__mixedmark {\n  transform: scaleX(1) rotate(0deg);\n  opacity: 1;\n}\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n  }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  }\n}\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    animation-timing-function: linear;\n    opacity: 0;\n  }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n}\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden;\n}\n.mdc-ripple-surface--test-edge-var-bug::before {\n  border: var(--mdc-ripple-surface-test-edge-var);\n}\n\n.mdc-checkbox {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  padding: 11px;\n}\n.mdc-checkbox::before, .mdc-checkbox::after {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: \"\";\n}\n.mdc-checkbox::before {\n  transition: opacity 15ms linear, background-color 15ms linear;\n  z-index: 1;\n}\n.mdc-checkbox.mdc-ripple-upgraded::before {\n  transform: scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-checkbox.mdc-ripple-upgraded::after {\n  top: 0;\n  /* @noflip */\n  left: 0;\n  transform: scale(0);\n  transform-origin: center center;\n}\n.mdc-checkbox.mdc-ripple-upgraded--unbounded::after {\n  top: var(--mdc-ripple-top, 0);\n  /* @noflip */\n  left: var(--mdc-ripple-left, 0);\n}\n.mdc-checkbox.mdc-ripple-upgraded--foreground-activation::after {\n  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n}\n.mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation::after {\n  animation: mdc-ripple-fg-opacity-out 150ms;\n  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-checkbox::before, .mdc-checkbox::after {\n  background-color: #000;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-checkbox::before, .mdc-checkbox::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-on-surface, #000);\n  }\n}\n.mdc-checkbox:hover::before {\n  opacity: 0.04;\n}\n.mdc-checkbox:not(.mdc-ripple-upgraded):focus::before, .mdc-checkbox.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-checkbox:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-checkbox:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-checkbox.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-checkbox::before, .mdc-checkbox::after {\n  top: calc(50% - 50%);\n  /* @noflip */\n  left: calc(50% - 50%);\n  width: 100%;\n  height: 100%;\n}\n.mdc-checkbox.mdc-ripple-upgraded::before, .mdc-checkbox.mdc-ripple-upgraded::after {\n  top: var(--mdc-ripple-top, calc(50% - 50%));\n  /* @noflip */\n  left: var(--mdc-ripple-left, calc(50% - 50%));\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-checkbox.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-checkbox .mdc-checkbox__background {\n  /* @noflip */\n  left: 11px;\n  /* @noflip */\n  right: initial;\n  top: 11px;\n}\n.mdc-checkbox[dir=rtl] .mdc-checkbox .mdc-checkbox__background, [dir=rtl] .mdc-checkbox .mdc-checkbox .mdc-checkbox__background {\n  /* @noflip */\n  left: initial;\n  /* @noflip */\n  right: 11px;\n}\n\n.mdc-checkbox .mdc-checkbox__background::before {\n  top: -13px;\n  left: -13px;\n  width: 40px;\n  height: 40px;\n}\n\n.mdc-ripple-upgraded--background-focused .mdc-checkbox__background::before {\n  content: none;\n}\n";
    styleInject(css_248z);

    /* node_modules/@smui/common/A.svelte generated by Svelte v3.24.1 */
    const file$6 = "node_modules/@smui/common/A.svelte";

    function create_fragment$8(ctx) {
    	let a;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	let a_levels = [{ href: /*href*/ ctx[1] }, exclude(/*$$props*/ ctx[3], ["use", "href"])];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[2].call(null, a))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 16) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 2) && { href: /*href*/ ctx[1] },
    				dirty & /*$$props*/ 8 && exclude(/*$$props*/ ctx[3], ["use", "href"])
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { href = "javascript:void(0);" } = $$props;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("A", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
    		if ("$$scope" in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use,
    		href
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [use, href, forwardEvents, $$props, $$scope, $$slots];
    }

    class A extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { use: 0, href: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "A",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get use() {
    		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/Button.svelte generated by Svelte v3.24.1 */
    const file$7 = "node_modules/@smui/common/Button.svelte";

    function create_fragment$9(ctx) {
    	let button;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	let button_levels = [exclude(/*$$props*/ ctx[2], ["use"])];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			set_attributes(button, button_data);
    			add_location(button, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, button, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[1].call(null, button))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [dirty & /*$$props*/ 4 && exclude(/*$$props*/ ctx[2], ["use"])]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [use, forwardEvents, $$props, $$scope, $$slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { use: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get use() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function Ripple(node, props = {ripple: false, unbounded: false, color: null, classForward: () => {}}) {
      let instance = null;
      let addLayoutListener = getContext('SMUI:addLayoutListener');
      let removeLayoutListener;
      let classList = [];

      function addClass(className) {
        const idx = classList.indexOf(className);
        if (idx === -1) {
          node.classList.add(className);
          classList.push(className);
          if (props.classForward) {
            props.classForward(classList);
          }
        }
      }

      function removeClass(className) {
        const idx = classList.indexOf(className);
        if (idx !== -1) {
          node.classList.remove(className);
          classList.splice(idx, 1);
          if (props.classForward) {
            props.classForward(classList);
          }
        }
      }

      function handleProps() {
        if (props.ripple && !instance) {
          // Override the Ripple component's adapter, so that we can forward classes
          // to Svelte components that overwrite Ripple's classes.
          const _createAdapter = MDCRipple.createAdapter;
          MDCRipple.createAdapter = function(...args) {
            const adapter = _createAdapter.apply(this, args);
            adapter.addClass = function(className) {
              return addClass(className);
            };
            adapter.removeClass = function(className) {
              return removeClass(className);
            };
            return adapter;
          };
          instance = new MDCRipple(node);
          MDCRipple.createAdapter = _createAdapter;
        } else if (instance && !props.ripple) {
          instance.destroy();
          instance = null;
        }
        if (props.ripple) {
          instance.unbounded = !!props.unbounded;
          switch (props.color) {
            case 'surface':
              addClass('mdc-ripple-surface');
              removeClass('mdc-ripple-surface--primary');
              removeClass('mdc-ripple-surface--accent');
              return;
            case 'primary':
              addClass('mdc-ripple-surface');
              addClass('mdc-ripple-surface--primary');
              removeClass('mdc-ripple-surface--accent');
              return;
            case 'secondary':
              addClass('mdc-ripple-surface');
              removeClass('mdc-ripple-surface--primary');
              addClass('mdc-ripple-surface--accent');
              return;
          }
        }
        removeClass('mdc-ripple-surface');
        removeClass('mdc-ripple-surface--primary');
        removeClass('mdc-ripple-surface--accent');
      }

      handleProps();

      if (addLayoutListener) {
        removeLayoutListener = addLayoutListener(layout);
      }

      function layout() {
        if (instance) {
          instance.layout();
        }
      }

      return {
        update(newProps = {ripple: false, unbounded: false, color: null, classForward: []}) {
          props = newProps;
          handleProps();
        },

        destroy() {
          if (instance) {
            instance.destroy();
            instance = null;
            removeClass('mdc-ripple-surface');
            removeClass('mdc-ripple-surface--primary');
            removeClass('mdc-ripple-surface--accent');
          }

          if (removeLayoutListener) {
            removeLayoutListener();
          }
        }
      }
    }

    /* node_modules/@smui/button/Button.svelte generated by Svelte v3.24.1 */

    // (1:0) <svelte:component   this={component}   use={[[Ripple, {ripple, unbounded: false, classForward: classes => rippleClasses = classes}], forwardEvents, ...use]}   class="     mdc-button     {className}     {rippleClasses.join(' ')}     {variant === 'raised' ? 'mdc-button--raised' : ''}     {variant === 'unelevated' ? 'mdc-button--unelevated' : ''}     {variant === 'outlined' ? 'mdc-button--outlined' : ''}     {dense ? 'mdc-button--dense' : ''}     {color === 'secondary' ? 'smui-button--color-secondary' : ''}     {context === 'card:action' ? 'mdc-card__action' : ''}     {context === 'card:action' ? 'mdc-card__action--button' : ''}     {context === 'dialog:action' ? 'mdc-dialog__button' : ''}     {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}     {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}     {context === 'snackbar' ? 'mdc-snackbar__action' : ''}   "   {...actionProp}   {...defaultProp}   {...exclude($$props, ['use', 'class', 'ripple', 'color', 'variant', 'dense', ...dialogExcludes])} >
    function create_default_slot(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 524288) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[19], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   use={[[Ripple, {ripple, unbounded: false, classForward: classes => rippleClasses = classes}], forwardEvents, ...use]}   class=\\\"     mdc-button     {className}     {rippleClasses.join(' ')}     {variant === 'raised' ? 'mdc-button--raised' : ''}     {variant === 'unelevated' ? 'mdc-button--unelevated' : ''}     {variant === 'outlined' ? 'mdc-button--outlined' : ''}     {dense ? 'mdc-button--dense' : ''}     {color === 'secondary' ? 'smui-button--color-secondary' : ''}     {context === 'card:action' ? 'mdc-card__action' : ''}     {context === 'card:action' ? 'mdc-card__action--button' : ''}     {context === 'dialog:action' ? 'mdc-dialog__button' : ''}     {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}     {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}     {context === 'snackbar' ? 'mdc-snackbar__action' : ''}   \\\"   {...actionProp}   {...defaultProp}   {...exclude($$props, ['use', 'class', 'ripple', 'color', 'variant', 'dense', ...dialogExcludes])} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [
    				[
    					Ripple,
    					{
    						ripple: /*ripple*/ ctx[2],
    						unbounded: false,
    						classForward: /*func*/ ctx[18]
    					}
    				],
    				/*forwardEvents*/ ctx[11],
    				.../*use*/ ctx[0]
    			]
    		},
    		{
    			class: "\n    mdc-button\n    " + /*className*/ ctx[1] + "\n    " + /*rippleClasses*/ ctx[7].join(" ") + "\n    " + (/*variant*/ ctx[4] === "raised"
    			? "mdc-button--raised"
    			: "") + "\n    " + (/*variant*/ ctx[4] === "unelevated"
    			? "mdc-button--unelevated"
    			: "") + "\n    " + (/*variant*/ ctx[4] === "outlined"
    			? "mdc-button--outlined"
    			: "") + "\n    " + (/*dense*/ ctx[5] ? "mdc-button--dense" : "") + "\n    " + (/*color*/ ctx[3] === "secondary"
    			? "smui-button--color-secondary"
    			: "") + "\n    " + (/*context*/ ctx[12] === "card:action"
    			? "mdc-card__action"
    			: "") + "\n    " + (/*context*/ ctx[12] === "card:action"
    			? "mdc-card__action--button"
    			: "") + "\n    " + (/*context*/ ctx[12] === "dialog:action"
    			? "mdc-dialog__button"
    			: "") + "\n    " + (/*context*/ ctx[12] === "top-app-bar:navigation"
    			? "mdc-top-app-bar__navigation-icon"
    			: "") + "\n    " + (/*context*/ ctx[12] === "top-app-bar:action"
    			? "mdc-top-app-bar__action-item"
    			: "") + "\n    " + (/*context*/ ctx[12] === "snackbar"
    			? "mdc-snackbar__action"
    			: "") + "\n  "
    		},
    		/*actionProp*/ ctx[9],
    		/*defaultProp*/ ctx[10],
    		exclude(/*$$props*/ ctx[13], [
    			"use",
    			"class",
    			"ripple",
    			"color",
    			"variant",
    			"dense",
    			.../*dialogExcludes*/ ctx[8]
    		])
    	];

    	var switch_value = /*component*/ ctx[6];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = (dirty & /*Ripple, ripple, rippleClasses, forwardEvents, use, className, variant, dense, color, context, actionProp, defaultProp, exclude, $$props, dialogExcludes*/ 16319)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*Ripple, ripple, rippleClasses, forwardEvents, use*/ 2181 && {
    						use: [
    							[
    								Ripple,
    								{
    									ripple: /*ripple*/ ctx[2],
    									unbounded: false,
    									classForward: /*func*/ ctx[18]
    								}
    							],
    							/*forwardEvents*/ ctx[11],
    							.../*use*/ ctx[0]
    						]
    					},
    					dirty & /*className, rippleClasses, variant, dense, color, context*/ 4282 && {
    						class: "\n    mdc-button\n    " + /*className*/ ctx[1] + "\n    " + /*rippleClasses*/ ctx[7].join(" ") + "\n    " + (/*variant*/ ctx[4] === "raised"
    						? "mdc-button--raised"
    						: "") + "\n    " + (/*variant*/ ctx[4] === "unelevated"
    						? "mdc-button--unelevated"
    						: "") + "\n    " + (/*variant*/ ctx[4] === "outlined"
    						? "mdc-button--outlined"
    						: "") + "\n    " + (/*dense*/ ctx[5] ? "mdc-button--dense" : "") + "\n    " + (/*color*/ ctx[3] === "secondary"
    						? "smui-button--color-secondary"
    						: "") + "\n    " + (/*context*/ ctx[12] === "card:action"
    						? "mdc-card__action"
    						: "") + "\n    " + (/*context*/ ctx[12] === "card:action"
    						? "mdc-card__action--button"
    						: "") + "\n    " + (/*context*/ ctx[12] === "dialog:action"
    						? "mdc-dialog__button"
    						: "") + "\n    " + (/*context*/ ctx[12] === "top-app-bar:navigation"
    						? "mdc-top-app-bar__navigation-icon"
    						: "") + "\n    " + (/*context*/ ctx[12] === "top-app-bar:action"
    						? "mdc-top-app-bar__action-item"
    						: "") + "\n    " + (/*context*/ ctx[12] === "snackbar"
    						? "mdc-snackbar__action"
    						: "") + "\n  "
    					},
    					dirty & /*actionProp*/ 512 && get_spread_object(/*actionProp*/ ctx[9]),
    					dirty & /*defaultProp*/ 1024 && get_spread_object(/*defaultProp*/ ctx[10]),
    					dirty & /*exclude, $$props, dialogExcludes*/ 8448 && get_spread_object(exclude(/*$$props*/ ctx[13], [
    						"use",
    						"class",
    						"ripple",
    						"color",
    						"variant",
    						"dense",
    						.../*dialogExcludes*/ ctx[8]
    					]))
    				])
    			: {};

    			if (dirty & /*$$scope*/ 524288) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[6])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	let { ripple = true } = $$props;
    	let { color = "primary" } = $$props;
    	let { variant = "text" } = $$props;
    	let { dense = false } = $$props;
    	let { href = null } = $$props;
    	let { action = "close" } = $$props;
    	let { default: defaultAction = false } = $$props;
    	let { component = href == null ? Button : A } = $$props;
    	let context = getContext("SMUI:button:context");
    	let rippleClasses = [];
    	setContext("SMUI:label:context", "button");
    	setContext("SMUI:icon:context", "button");
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, ['default']);
    	const func = classes => $$invalidate(7, rippleClasses = classes);

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("ripple" in $$new_props) $$invalidate(2, ripple = $$new_props.ripple);
    		if ("color" in $$new_props) $$invalidate(3, color = $$new_props.color);
    		if ("variant" in $$new_props) $$invalidate(4, variant = $$new_props.variant);
    		if ("dense" in $$new_props) $$invalidate(5, dense = $$new_props.dense);
    		if ("href" in $$new_props) $$invalidate(14, href = $$new_props.href);
    		if ("action" in $$new_props) $$invalidate(15, action = $$new_props.action);
    		if ("default" in $$new_props) $$invalidate(16, defaultAction = $$new_props.default);
    		if ("component" in $$new_props) $$invalidate(6, component = $$new_props.component);
    		if ("$$scope" in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		A,
    		Button,
    		Ripple,
    		forwardEvents,
    		use,
    		className,
    		ripple,
    		color,
    		variant,
    		dense,
    		href,
    		action,
    		defaultAction,
    		component,
    		context,
    		rippleClasses,
    		dialogExcludes,
    		actionProp,
    		defaultProp
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    		if ("ripple" in $$props) $$invalidate(2, ripple = $$new_props.ripple);
    		if ("color" in $$props) $$invalidate(3, color = $$new_props.color);
    		if ("variant" in $$props) $$invalidate(4, variant = $$new_props.variant);
    		if ("dense" in $$props) $$invalidate(5, dense = $$new_props.dense);
    		if ("href" in $$props) $$invalidate(14, href = $$new_props.href);
    		if ("action" in $$props) $$invalidate(15, action = $$new_props.action);
    		if ("defaultAction" in $$props) $$invalidate(16, defaultAction = $$new_props.defaultAction);
    		if ("component" in $$props) $$invalidate(6, component = $$new_props.component);
    		if ("context" in $$props) $$invalidate(12, context = $$new_props.context);
    		if ("rippleClasses" in $$props) $$invalidate(7, rippleClasses = $$new_props.rippleClasses);
    		if ("dialogExcludes" in $$props) $$invalidate(8, dialogExcludes = $$new_props.dialogExcludes);
    		if ("actionProp" in $$props) $$invalidate(9, actionProp = $$new_props.actionProp);
    		if ("defaultProp" in $$props) $$invalidate(10, defaultProp = $$new_props.defaultProp);
    	};

    	let dialogExcludes;
    	let actionProp;
    	let defaultProp;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*action*/ 32768) {
    			 $$invalidate(9, actionProp = context === "dialog:action" && action !== null
    			? { "data-mdc-dialog-action": action }
    			: {});
    		}

    		if ($$self.$$.dirty & /*defaultAction*/ 65536) {
    			 $$invalidate(10, defaultProp = context === "dialog:action" && defaultAction
    			? { "data-mdc-dialog-button-default": "" }
    			: {});
    		}
    	};

    	 $$invalidate(8, dialogExcludes = context === "dialog:action" ? ["action", "default"] : []);
    	$$props = exclude_internal_props($$props);

    	return [
    		use,
    		className,
    		ripple,
    		color,
    		variant,
    		dense,
    		component,
    		rippleClasses,
    		dialogExcludes,
    		actionProp,
    		defaultProp,
    		forwardEvents,
    		context,
    		$$props,
    		href,
    		action,
    		defaultAction,
    		$$slots,
    		func,
    		$$scope
    	];
    }

    class Button_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
    			use: 0,
    			class: 1,
    			ripple: 2,
    			color: 3,
    			variant: 4,
    			dense: 5,
    			href: 14,
    			action: 15,
    			default: 16,
    			component: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button_1",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get use() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dense() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dense(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get action() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set action(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get default() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set default(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/Label.svelte generated by Svelte v3.24.1 */
    const file$8 = "node_modules/@smui/common/Label.svelte";

    function create_fragment$b(ctx) {
    	let span;
    	let span_class_value;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	let span_levels = [
    		{
    			class: span_class_value = "\n    " + /*className*/ ctx[1] + "\n    " + (/*context*/ ctx[3] === "button"
    			? "mdc-button__label"
    			: "") + "\n    " + (/*context*/ ctx[3] === "fab" ? "mdc-fab__label" : "") + "\n    " + (/*context*/ ctx[3] === "chip" ? "mdc-chip__text" : "") + "\n    " + (/*context*/ ctx[3] === "tab"
    			? "mdc-tab__text-label"
    			: "") + "\n    " + (/*context*/ ctx[3] === "image-list"
    			? "mdc-image-list__label"
    			: "") + "\n    " + (/*context*/ ctx[3] === "snackbar"
    			? "mdc-snackbar__label"
    			: "") + "\n  "
    		},
    		/*context*/ ctx[3] === "snackbar"
    		? { role: "status", "aria-live": "polite" }
    		: {},
    		exclude(/*$$props*/ ctx[4], ["use", "class"])
    	];

    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			set_attributes(span, span_data);
    			add_location(span, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[2].call(null, span))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [
    				(!current || dirty & /*className*/ 2 && span_class_value !== (span_class_value = "\n    " + /*className*/ ctx[1] + "\n    " + (/*context*/ ctx[3] === "button"
    				? "mdc-button__label"
    				: "") + "\n    " + (/*context*/ ctx[3] === "fab" ? "mdc-fab__label" : "") + "\n    " + (/*context*/ ctx[3] === "chip" ? "mdc-chip__text" : "") + "\n    " + (/*context*/ ctx[3] === "tab"
    				? "mdc-tab__text-label"
    				: "") + "\n    " + (/*context*/ ctx[3] === "image-list"
    				? "mdc-image-list__label"
    				: "") + "\n    " + (/*context*/ ctx[3] === "snackbar"
    				? "mdc-snackbar__label"
    				: "") + "\n  ")) && { class: span_class_value },
    				/*context*/ ctx[3] === "snackbar"
    				? { role: "status", "aria-live": "polite" }
    				: {},
    				dirty & /*$$props*/ 16 && exclude(/*$$props*/ ctx[4], ["use", "class"])
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	const context = getContext("SMUI:label:context");
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Label", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		context
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [use, className, forwardEvents, context, $$props, $$scope, $$slots];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { use: 0, class: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get use() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/Icon.svelte generated by Svelte v3.24.1 */
    const file$9 = "node_modules/@smui/common/Icon.svelte";

    function create_fragment$c(ctx) {
    	let i;
    	let i_class_value;
    	let useActions_action;
    	let forwardEvents_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

    	let i_levels = [
    		{
    			class: i_class_value = "\n    " + /*className*/ ctx[1] + "\n    " + (/*context*/ ctx[7] === "button"
    			? "mdc-button__icon"
    			: "") + "\n    " + (/*context*/ ctx[7] === "fab" ? "mdc-fab__icon" : "") + "\n    " + (/*context*/ ctx[7] === "icon-button"
    			? "mdc-icon-button__icon"
    			: "") + "\n    " + (/*context*/ ctx[7] === "icon-button" && /*on*/ ctx[2]
    			? "mdc-icon-button__icon--on"
    			: "") + "\n    " + (/*context*/ ctx[7] === "chip" ? "mdc-chip__icon" : "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leading*/ ctx[3]
    			? "mdc-chip__icon--leading"
    			: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leadingHidden*/ ctx[4]
    			? "mdc-chip__icon--leading-hidden"
    			: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*trailing*/ ctx[5]
    			? "mdc-chip__icon--trailing"
    			: "") + "\n    " + (/*context*/ ctx[7] === "tab" ? "mdc-tab__icon" : "") + "\n  "
    		},
    		{ "aria-hidden": "true" },
    		exclude(/*$$props*/ ctx[8], ["use", "class", "on", "leading", "leadingHidden", "trailing"])
    	];

    	let i_data = {};

    	for (let i = 0; i < i_levels.length; i += 1) {
    		i_data = assign(i_data, i_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			i = element("i");
    			if (default_slot) default_slot.c();
    			set_attributes(i, i_data);
    			add_location(i, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);

    			if (default_slot) {
    				default_slot.m(i, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, i, /*use*/ ctx[0])),
    					action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[6].call(null, i))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 512) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[9], dirty, null, null);
    				}
    			}

    			set_attributes(i, i_data = get_spread_update(i_levels, [
    				(!current || dirty & /*className, on, leading, leadingHidden, trailing*/ 62 && i_class_value !== (i_class_value = "\n    " + /*className*/ ctx[1] + "\n    " + (/*context*/ ctx[7] === "button"
    				? "mdc-button__icon"
    				: "") + "\n    " + (/*context*/ ctx[7] === "fab" ? "mdc-fab__icon" : "") + "\n    " + (/*context*/ ctx[7] === "icon-button"
    				? "mdc-icon-button__icon"
    				: "") + "\n    " + (/*context*/ ctx[7] === "icon-button" && /*on*/ ctx[2]
    				? "mdc-icon-button__icon--on"
    				: "") + "\n    " + (/*context*/ ctx[7] === "chip" ? "mdc-chip__icon" : "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leading*/ ctx[3]
    				? "mdc-chip__icon--leading"
    				: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leadingHidden*/ ctx[4]
    				? "mdc-chip__icon--leading-hidden"
    				: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*trailing*/ ctx[5]
    				? "mdc-chip__icon--trailing"
    				: "") + "\n    " + (/*context*/ ctx[7] === "tab" ? "mdc-tab__icon" : "") + "\n  ")) && { class: i_class_value },
    				{ "aria-hidden": "true" },
    				dirty & /*$$props*/ 256 && exclude(/*$$props*/ ctx[8], ["use", "class", "on", "leading", "leadingHidden", "trailing"])
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = "" } = $$props;
    	let { on = false } = $$props;
    	let { leading = false } = $$props;
    	let { leadingHidden = false } = $$props;
    	let { trailing = false } = $$props;
    	const context = getContext("SMUI:icon:context");
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Icon", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("on" in $$new_props) $$invalidate(2, on = $$new_props.on);
    		if ("leading" in $$new_props) $$invalidate(3, leading = $$new_props.leading);
    		if ("leadingHidden" in $$new_props) $$invalidate(4, leadingHidden = $$new_props.leadingHidden);
    		if ("trailing" in $$new_props) $$invalidate(5, trailing = $$new_props.trailing);
    		if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		exclude,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		on,
    		leading,
    		leadingHidden,
    		trailing,
    		context
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(8, $$props = assign(assign({}, $$props), $$new_props));
    		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    		if ("on" in $$props) $$invalidate(2, on = $$new_props.on);
    		if ("leading" in $$props) $$invalidate(3, leading = $$new_props.leading);
    		if ("leadingHidden" in $$props) $$invalidate(4, leadingHidden = $$new_props.leadingHidden);
    		if ("trailing" in $$props) $$invalidate(5, trailing = $$new_props.trailing);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);

    	return [
    		use,
    		className,
    		on,
    		leading,
    		leadingHidden,
    		trailing,
    		forwardEvents,
    		context,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {
    			use: 0,
    			class: 1,
    			on: 2,
    			leading: 3,
    			leadingHidden: 4,
    			trailing: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get use() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get on() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set on(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get leading() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set leading(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get leadingHidden() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set leadingHidden(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get trailing() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trailing(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var css_248z$1 = ".mdc-button {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.0892857143em;\n  text-decoration: none;\n  text-transform: uppercase;\n  padding: 0 8px 0 8px;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  height: 36px;\n  border: none;\n  outline: none;\n  /* @alternate */\n  line-height: inherit;\n  user-select: none;\n  -webkit-appearance: none;\n  overflow: hidden;\n  vertical-align: middle;\n  border-radius: 4px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  background-color: transparent;\n  color: rgba(0, 0, 0, 0.37);\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button.mdc-button--dense {\n  border-radius: 4px;\n}\n.mdc-button:not(:disabled) {\n  background-color: transparent;\n}\n.mdc-button .mdc-button__icon {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 8px;\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  vertical-align: top;\n}\n[dir=rtl] .mdc-button .mdc-button__icon, .mdc-button .mdc-button__icon[dir=rtl] {\n  /* @noflip */\n  margin-left: 8px;\n  /* @noflip */\n  margin-right: 0;\n}\n.mdc-button:not(:disabled) {\n  color: #6200ee;\n  /* @alternate */\n  color: var(--mdc-theme-primary, #6200ee);\n}\n\n.mdc-button__label + .mdc-button__icon {\n  /* @noflip */\n  margin-left: 8px;\n  /* @noflip */\n  margin-right: 0;\n}\n[dir=rtl] .mdc-button__label + .mdc-button__icon, .mdc-button__label + .mdc-button__icon[dir=rtl] {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 8px;\n}\n\nsvg.mdc-button__icon {\n  fill: currentColor;\n}\n\n.mdc-button--raised .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__icon,\n.mdc-button--outlined .mdc-button__icon {\n  /* @noflip */\n  margin-left: -4px;\n  /* @noflip */\n  margin-right: 8px;\n}\n[dir=rtl] .mdc-button--raised .mdc-button__icon, .mdc-button--raised .mdc-button__icon[dir=rtl],\n[dir=rtl] .mdc-button--unelevated .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__icon[dir=rtl],\n[dir=rtl] .mdc-button--outlined .mdc-button__icon,\n.mdc-button--outlined .mdc-button__icon[dir=rtl] {\n  /* @noflip */\n  margin-left: 8px;\n  /* @noflip */\n  margin-right: -4px;\n}\n.mdc-button--raised .mdc-button__label + .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__label + .mdc-button__icon,\n.mdc-button--outlined .mdc-button__label + .mdc-button__icon {\n  /* @noflip */\n  margin-left: 8px;\n  /* @noflip */\n  margin-right: -4px;\n}\n[dir=rtl] .mdc-button--raised .mdc-button__label + .mdc-button__icon, .mdc-button--raised .mdc-button__label + .mdc-button__icon[dir=rtl],\n[dir=rtl] .mdc-button--unelevated .mdc-button__label + .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__label + .mdc-button__icon[dir=rtl],\n[dir=rtl] .mdc-button--outlined .mdc-button__label + .mdc-button__icon,\n.mdc-button--outlined .mdc-button__label + .mdc-button__icon[dir=rtl] {\n  /* @noflip */\n  margin-left: -4px;\n  /* @noflip */\n  margin-right: 8px;\n}\n\n.mdc-button--raised,\n.mdc-button--unelevated {\n  padding: 0 16px 0 16px;\n}\n.mdc-button--raised:disabled,\n.mdc-button--unelevated:disabled {\n  background-color: rgba(0, 0, 0, 0.12);\n  color: rgba(0, 0, 0, 0.37);\n}\n.mdc-button--raised:not(:disabled),\n.mdc-button--unelevated:not(:disabled) {\n  background-color: #6200ee;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-button--raised:not(:disabled),\n.mdc-button--unelevated:not(:disabled) {\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-button--raised:not(:disabled),\n.mdc-button--unelevated:not(:disabled) {\n  color: #fff;\n  /* @alternate */\n  color: var(--mdc-theme-on-primary, #fff);\n}\n\n.mdc-button--raised {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-button--raised:hover, .mdc-button--raised:focus {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n.mdc-button--raised:active {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n.mdc-button--raised:disabled {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mdc-button--outlined {\n  border-style: solid;\n  padding: 0 15px 0 15px;\n  border-width: 1px;\n}\n.mdc-button--outlined:disabled {\n  border-color: rgba(0, 0, 0, 0.37);\n}\n.mdc-button--outlined:not(:disabled) {\n  border-color: #6200ee;\n  /* @alternate */\n  border-color: var(--mdc-theme-primary, #6200ee);\n}\n\n.mdc-button--dense {\n  height: 32px;\n  font-size: 0.8125rem;\n}\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n  }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  }\n}\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    animation-timing-function: linear;\n    opacity: 0;\n  }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n}\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden;\n}\n.mdc-ripple-surface--test-edge-var-bug::before {\n  border: var(--mdc-ripple-surface-test-edge-var);\n}\n\n.mdc-button {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.mdc-button::before, .mdc-button::after {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: \"\";\n}\n.mdc-button::before {\n  transition: opacity 15ms linear, background-color 15ms linear;\n  z-index: 1;\n}\n.mdc-button.mdc-ripple-upgraded::before {\n  transform: scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-button.mdc-ripple-upgraded::after {\n  top: 0;\n  /* @noflip */\n  left: 0;\n  transform: scale(0);\n  transform-origin: center center;\n}\n.mdc-button.mdc-ripple-upgraded--unbounded::after {\n  top: var(--mdc-ripple-top, 0);\n  /* @noflip */\n  left: var(--mdc-ripple-left, 0);\n}\n.mdc-button.mdc-ripple-upgraded--foreground-activation::after {\n  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n}\n.mdc-button.mdc-ripple-upgraded--foreground-deactivation::after {\n  animation: mdc-ripple-fg-opacity-out 150ms;\n  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-button::before, .mdc-button::after {\n  top: calc(50% - 100%);\n  /* @noflip */\n  left: calc(50% - 100%);\n  width: 200%;\n  height: 200%;\n}\n.mdc-button.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-button::before, .mdc-button::after {\n  background-color: #6200ee;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-button::before, .mdc-button::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-button:hover::before {\n  opacity: 0.04;\n}\n.mdc-button:not(.mdc-ripple-upgraded):focus::before, .mdc-button.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-button:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-button:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-button.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n\n.mdc-button--raised::before, .mdc-button--raised::after,\n.mdc-button--unelevated::before,\n.mdc-button--unelevated::after {\n  background-color: #fff;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-button--raised::before, .mdc-button--raised::after,\n.mdc-button--unelevated::before,\n.mdc-button--unelevated::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-on-primary, #fff);\n  }\n}\n.mdc-button--raised:hover::before,\n.mdc-button--unelevated:hover::before {\n  opacity: 0.08;\n}\n.mdc-button--raised:not(.mdc-ripple-upgraded):focus::before, .mdc-button--raised.mdc-ripple-upgraded--background-focused::before,\n.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus::before,\n.mdc-button--unelevated.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.24;\n}\n.mdc-button--raised:not(.mdc-ripple-upgraded)::after,\n.mdc-button--unelevated:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-button--raised:not(.mdc-ripple-upgraded):active::after,\n.mdc-button--unelevated:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.24;\n}\n.mdc-button--raised.mdc-ripple-upgraded,\n.mdc-button--unelevated.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.24;\n}\n\n.mdc-ripple-surface {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  position: relative;\n  outline: none;\n  overflow: hidden;\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: \"\";\n}\n.mdc-ripple-surface::before {\n  transition: opacity 15ms linear, background-color 15ms linear;\n  z-index: 1;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::before {\n  transform: scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::after {\n  top: 0;\n  /* @noflip */\n  left: 0;\n  transform: scale(0);\n  transform-origin: center center;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after {\n  top: var(--mdc-ripple-top, 0);\n  /* @noflip */\n  left: var(--mdc-ripple-left, 0);\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after {\n  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after {\n  animation: mdc-ripple-fg-opacity-out 150ms;\n  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  background-color: #000;\n}\n.mdc-ripple-surface:hover::before {\n  opacity: 0.04;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  top: calc(50% - 100%);\n  /* @noflip */\n  left: calc(50% - 100%);\n  width: 200%;\n  height: 200%;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded] {\n  overflow: visible;\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before, .mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after {\n  top: calc(50% - 50%);\n  /* @noflip */\n  left: calc(50% - 50%);\n  width: 100%;\n  height: 100%;\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before, .mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after {\n  top: var(--mdc-ripple-top, calc(50% - 50%));\n  /* @noflip */\n  left: var(--mdc-ripple-left, calc(50% - 50%));\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after {\n  background-color: #6200ee;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-ripple-surface--primary:hover::before {\n  opacity: 0.04;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--primary.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {\n  background-color: #018786;\n}\n@supports not (-ms-ime-align: auto) {\n  .mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n.mdc-ripple-surface--accent:hover::before {\n  opacity: 0.04;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--accent.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n\n.smui-button--color-secondary:not(:disabled) {\n  color: #018786;\n  /* @alternate */\n  color: var(--mdc-theme-secondary, #018786);\n}\n.smui-button--color-secondary.mdc-button--raised:not(:disabled), .smui-button--color-secondary.mdc-button--unelevated:not(:disabled) {\n  background-color: #018786;\n}\n@supports not (-ms-ime-align: auto) {\n  .smui-button--color-secondary.mdc-button--raised:not(:disabled), .smui-button--color-secondary.mdc-button--unelevated:not(:disabled) {\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n.smui-button--color-secondary.mdc-button--raised:not(:disabled), .smui-button--color-secondary.mdc-button--unelevated:not(:disabled) {\n  color: #fff;\n  /* @alternate */\n  color: var(--mdc-theme-on-secondary, #fff);\n}\n.smui-button--color-secondary.mdc-button--outlined:not(:disabled) {\n  border-color: #018786;\n  /* @alternate */\n  border-color: var(--mdc-theme-secondary, #018786);\n}\n\n.smui-button--color-secondary::before, .smui-button--color-secondary::after {\n  background-color: #018786;\n}\n@supports not (-ms-ime-align: auto) {\n  .smui-button--color-secondary::before, .smui-button--color-secondary::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n.smui-button--color-secondary:hover::before {\n  opacity: 0.04;\n}\n.smui-button--color-secondary:not(.mdc-ripple-upgraded):focus::before, .smui-button--color-secondary.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.smui-button--color-secondary:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.smui-button--color-secondary:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.smui-button--color-secondary.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.smui-button--color-secondary.mdc-button--raised::before, .smui-button--color-secondary.mdc-button--raised::after, .smui-button--color-secondary.mdc-button--unelevated::before, .smui-button--color-secondary.mdc-button--unelevated::after {\n  background-color: #fff;\n}\n@supports not (-ms-ime-align: auto) {\n  .smui-button--color-secondary.mdc-button--raised::before, .smui-button--color-secondary.mdc-button--raised::after, .smui-button--color-secondary.mdc-button--unelevated::before, .smui-button--color-secondary.mdc-button--unelevated::after {\n    /* @alternate */\n    background-color: var(--mdc-theme-on-secondary, #fff);\n  }\n}\n.smui-button--color-secondary.mdc-button--raised:hover::before, .smui-button--color-secondary.mdc-button--unelevated:hover::before {\n  opacity: 0.08;\n}\n.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):focus::before, .smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded--background-focused::before, .smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus::before, .smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded--background-focused::before {\n  transition-duration: 75ms;\n  opacity: 0.24;\n}\n.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded)::after, .smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):active::after, .smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.24;\n}\n.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded, .smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.24;\n}\n\n.smui-button__group {\n  display: inline-flex;\n}\n.smui-button__group > .mdc-button, .smui-button__group > .smui-button__group-item > .mdc-button {\n  margin-left: 0;\n  margin-right: 0;\n}\n.smui-button__group > .mdc-button:not(:last-child), .smui-button__group > .smui-button__group-item:not(:last-child) > .mdc-button {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.smui-button__group > .mdc-button:not(:first-child), .smui-button__group > .smui-button__group-item:not(:first-child) > .mdc-button {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.smui-button__group.smui-button__group--raised {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n.smui-button__group > .mdc-button--raised, .smui-button__group > .smui-button__group-item > .mdc-button--raised {\n  border-radius: 4px;\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n.smui-button__group > .mdc-button--raised.mdc-button--dense, .smui-button__group > .smui-button__group-item > .mdc-button--raised.mdc-button--dense {\n  border-radius: 4px;\n}\n.smui-button__group > .mdc-button--raised:hover, .smui-button__group > .mdc-button--raised:focus, .smui-button__group > .smui-button__group-item > .mdc-button--raised:hover, .smui-button__group > .smui-button__group-item > .mdc-button--raised:focus {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n.smui-button__group > .mdc-button--raised:active, .smui-button__group > .smui-button__group-item > .mdc-button--raised:active {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n.smui-button__group > .mdc-button--raised:disabled, .smui-button__group > .smui-button__group-item > .mdc-button--raised:disabled {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n.smui-button__group > .mdc-button--outlined:not(:last-child), .smui-button__group > .smui-button__group-item:not(:last-child) > .mdc-button--outlined {\n  border-right-width: 0;\n}\n";
    styleInject(css_248z$1);

    const BASE_URL = "http://localhost:3000/api/v1/dispositivos/";

    async function listarDispositivos() {
        let respuesta = await fetch(BASE_URL, {
            method: 'GET',
        });

        if (respuesta.status !== 200) {
            throw new Error(`Estado HTTP ${respuesta.status}`);
        }
        return respuesta;
    }

    async function obtenerDispositivo(id) {
        let respuesta = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
        });

        if (respuesta.status !== 200) {
            throw new Error(`Estado HTTP ${respuesta.status}`);
        }
        return respuesta;
    }


    async function agregarDispositivo(datos) {
        let respuesta = await fetch(BASE_URL, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (respuesta.status !== 201) {
            throw new Error(`Estado HTTP ${respuesta.status}`);
        }
    }

    async function eliminarDispositivo(id) {
        let respuesta = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
        
        if (respuesta.status !== 200) {
            throw new Error(`Estado HTTP ${respuesta.status}`);
        }
    }


    async function modificarDispositivo (datos) {
        let respuesta = await fetch(BASE_URL, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (respuesta.status !== 200) {
            throw new Error(`Estado HTTP ${respuesta.status}`);
        }
    }


    const dispositivosServicio = { listarDispositivos, obtenerDispositivo, modificarDispositivo, agregarDispositivo, eliminarDispositivo };

    /* src/componentes/ListadoDispositivos.svelte generated by Svelte v3.24.1 */
    const file$a = "src/componentes/ListadoDispositivos.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (41:12) <Label>
    function create_default_slot_21(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Mapa");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21.name,
    		type: "slot",
    		source: "(41:12) <Label>",
    		ctx
    	});

    	return block;
    }

    // (40:8) <Button variant="outlined">
    function create_default_slot_20(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_21] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20.name,
    		type: "slot",
    		source: "(40:8) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (46:12) <Label>
    function create_default_slot_19(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Nuevo dispositivo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19.name,
    		type: "slot",
    		source: "(46:12) <Label>",
    		ctx
    	});

    	return block;
    }

    // (45:8) <Button variant="outlined">
    function create_default_slot_18(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_19] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(45:8) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (50:4) {#if dispositivos}
    function create_if_block$2(ctx) {
    	let datatable;
    	let current;

    	datatable = new DataTable({
    			props: {
    				"table$aria-label": "Listado de Dispositivos",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(datatable.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(datatable, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const datatable_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				datatable_changes.$$scope = { dirty, ctx };
    			}

    			datatable.$set(datatable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(datatable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(datatable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(datatable, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(50:4) {#if dispositivos}",
    		ctx
    	});

    	return block;
    }

    // (54:20) <Cell>
    function create_default_slot_17(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Id dispositivo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(54:20) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (55:20) <Cell>
    function create_default_slot_16(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Denominación");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(55:20) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (53:16) <Row>
    function create_default_slot_15(ctx) {
    	let cell0;
    	let t;
    	let cell1;
    	let current;

    	cell0 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	cell1 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(cell0.$$.fragment);
    			t = space();
    			create_component(cell1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(cell0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(cell1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cell0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				cell0_changes.$$scope = { dirty, ctx };
    			}

    			cell0.$set(cell0_changes);
    			const cell1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				cell1_changes.$$scope = { dirty, ctx };
    			}

    			cell1.$set(cell1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cell0.$$.fragment, local);
    			transition_in(cell1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cell0.$$.fragment, local);
    			transition_out(cell1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cell0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(cell1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(53:16) <Row>",
    		ctx
    	});

    	return block;
    }

    // (52:12) <Head>
    function create_default_slot_14(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(52:12) <Head>",
    		ctx
    	});

    	return block;
    }

    // (61:24) <Cell>
    function create_default_slot_13(ctx) {
    	let t_value = /*dispositivo*/ ctx[4].id + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*dispositivos*/ 1 && t_value !== (t_value = /*dispositivo*/ ctx[4].id + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(61:24) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (62:24) <Cell>
    function create_default_slot_12(ctx) {
    	let t_value = /*dispositivo*/ ctx[4].denominacion + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*dispositivos*/ 1 && t_value !== (t_value = /*dispositivo*/ ctx[4].denominacion + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(62:24) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (66:36) <Label>
    function create_default_slot_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Editar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(66:36) <Label>",
    		ctx
    	});

    	return block;
    }

    // (65:32) <Button color="secondary" variant="raised">
    function create_default_slot_10(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(65:32) <Button color=\\\"secondary\\\" variant=\\\"raised\\\">",
    		ctx
    	});

    	return block;
    }

    // (63:24) <Cell>
    function create_default_slot_9(ctx) {
    	let a;
    	let button;
    	let a_href_value;
    	let current;

    	button = new Button_1({
    			props: {
    				color: "secondary",
    				variant: "raised",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			a = element("a");
    			create_component(button.$$.fragment);
    			attr_dev(a, "href", a_href_value = "/dispositivos/" + /*dispositivo*/ ctx[4].id);
    			add_location(a, file$a, 63, 28, 1843);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			mount_component(button, a, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (!current || dirty & /*dispositivos*/ 1 && a_href_value !== (a_href_value = "/dispositivos/" + /*dispositivo*/ ctx[4].id)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(63:24) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (74:32) <Label>
    function create_default_slot_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Eliminar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(74:32) <Label>",
    		ctx
    	});

    	return block;
    }

    // (71:28) <Button                                 on:click={() => eliminar(dispositivo.id)}                                 variant="raised">
    function create_default_slot_7(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(71:28) <Button                                 on:click={() => eliminar(dispositivo.id)}                                 variant=\\\"raised\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:24) <Cell>
    function create_default_slot_6(ctx) {
    	let button;
    	let current;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[2](/*dispositivo*/ ctx[4], ...args);
    	}

    	button = new Button_1({
    			props: {
    				variant: "raised",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", click_handler);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(70:24) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (80:36) <Label>
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Dashboard");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(80:36) <Label>",
    		ctx
    	});

    	return block;
    }

    // (79:32) <Button variant="outlined">
    function create_default_slot_4(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(79:32) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (77:24) <Cell>
    function create_default_slot_3(ctx) {
    	let a;
    	let button;
    	let a_href_value;
    	let current;

    	button = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			a = element("a");
    			create_component(button.$$.fragment);
    			attr_dev(a, "href", a_href_value = "/dispositivos/" + /*dispositivo*/ ctx[4].id + "/dashboard");
    			add_location(a, file$a, 77, 28, 2502);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			mount_component(button, a, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (!current || dirty & /*dispositivos*/ 1 && a_href_value !== (a_href_value = "/dispositivos/" + /*dispositivo*/ ctx[4].id + "/dashboard")) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(77:24) <Cell>",
    		ctx
    	});

    	return block;
    }

    // (60:20) <Row>
    function create_default_slot_2(ctx) {
    	let cell0;
    	let t0;
    	let cell1;
    	let t1;
    	let cell2;
    	let t2;
    	let cell3;
    	let t3;
    	let cell4;
    	let t4;
    	let current;

    	cell0 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	cell1 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	cell2 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	cell3 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	cell4 = new Cell({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(cell0.$$.fragment);
    			t0 = space();
    			create_component(cell1.$$.fragment);
    			t1 = space();
    			create_component(cell2.$$.fragment);
    			t2 = space();
    			create_component(cell3.$$.fragment);
    			t3 = space();
    			create_component(cell4.$$.fragment);
    			t4 = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(cell0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(cell1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(cell2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(cell3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(cell4, target, anchor);
    			insert_dev(target, t4, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cell0_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				cell0_changes.$$scope = { dirty, ctx };
    			}

    			cell0.$set(cell0_changes);
    			const cell1_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				cell1_changes.$$scope = { dirty, ctx };
    			}

    			cell1.$set(cell1_changes);
    			const cell2_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				cell2_changes.$$scope = { dirty, ctx };
    			}

    			cell2.$set(cell2_changes);
    			const cell3_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				cell3_changes.$$scope = { dirty, ctx };
    			}

    			cell3.$set(cell3_changes);
    			const cell4_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				cell4_changes.$$scope = { dirty, ctx };
    			}

    			cell4.$set(cell4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cell0.$$.fragment, local);
    			transition_in(cell1.$$.fragment, local);
    			transition_in(cell2.$$.fragment, local);
    			transition_in(cell3.$$.fragment, local);
    			transition_in(cell4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cell0.$$.fragment, local);
    			transition_out(cell1.$$.fragment, local);
    			transition_out(cell2.$$.fragment, local);
    			transition_out(cell3.$$.fragment, local);
    			transition_out(cell4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cell0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(cell1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(cell2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(cell3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(cell4, detaching);
    			if (detaching) detach_dev(t4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(60:20) <Row>",
    		ctx
    	});

    	return block;
    }

    // (59:16) {#each dispositivos as dispositivo}
    function create_each_block(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(59:16) {#each dispositivos as dispositivo}",
    		ctx
    	});

    	return block;
    }

    // (58:12) <Body>
    function create_default_slot_1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*dispositivos*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*dispositivos, eliminar*/ 3) {
    				each_value = /*dispositivos*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(58:12) <Body>",
    		ctx
    	});

    	return block;
    }

    // (51:8) <DataTable table$aria-label="Listado de Dispositivos">
    function create_default_slot$1(ctx) {
    	let head;
    	let t;
    	let body;
    	let current;

    	head = new Head({
    			props: {
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	body = new Body({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t = space();
    			create_component(body.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(body, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const head_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				head_changes.$$scope = { dirty, ctx };
    			}

    			head.$set(head_changes);
    			const body_changes = {};

    			if (dirty & /*$$scope, dispositivos*/ 129) {
    				body_changes.$$scope = { dirty, ctx };
    			}

    			body.$set(body_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(body.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(body.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(body, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(51:8) <DataTable table$aria-label=\\\"Listado de Dispositivos\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let a0;
    	let button0;
    	let t2;
    	let a1;
    	let button1;
    	let t3;
    	let br;
    	let t4;
    	let current;

    	button0 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_20] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*dispositivos*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "Dispositivos";
    			t1 = space();
    			a0 = element("a");
    			create_component(button0.$$.fragment);
    			t2 = space();
    			a1 = element("a");
    			create_component(button1.$$.fragment);
    			t3 = space();
    			br = element("br");
    			t4 = space();
    			if (if_block) if_block.c();
    			attr_dev(h2, "class", "svelte-f9adgw");
    			add_location(h2, file$a, 37, 4, 1017);
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$a, 38, 4, 1043);
    			attr_dev(a1, "href", "/dispositivos/nuevo");
    			add_location(a1, file$a, 43, 4, 1155);
    			add_location(br, file$a, 48, 4, 1298);
    			add_location(main, file$a, 36, 0, 1006);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			append_dev(main, a0);
    			mount_component(button0, a0, null);
    			append_dev(main, t2);
    			append_dev(main, a1);
    			mount_component(button1, a1, null);
    			append_dev(main, t3);
    			append_dev(main, br);
    			append_dev(main, t4);
    			if (if_block) if_block.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);

    			if (/*dispositivos*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*dispositivos*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(main, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let dispositivos = [];
    	let id;

    	onMount(async () => {
    		await dispositivosServicio.listarDispositivos().then(respuesta => respuesta.json()).then(resultado => $$invalidate(0, dispositivos = resultado));
    	});

    	async function eliminar(id) {
    		await dispositivosServicio.eliminarDispositivo(id);
    		await dispositivosServicio.listarDispositivos().then(respuesta => respuesta.json()).then(resultado => $$invalidate(0, dispositivos = resultado));
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ListadoDispositivos> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ListadoDispositivos", $$slots, []);
    	const click_handler = dispositivo => eliminar(dispositivo.id);

    	$$self.$capture_state = () => ({
    		onMount,
    		DataTable,
    		Head,
    		Body,
    		Row,
    		Cell,
    		Button: Button_1,
    		Label,
    		Icon,
    		dispositivosServicio,
    		dispositivos,
    		id,
    		eliminar
    	});

    	$$self.$inject_state = $$props => {
    		if ("dispositivos" in $$props) $$invalidate(0, dispositivos = $$props.dispositivos);
    		if ("id" in $$props) id = $$props.id;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [dispositivos, eliminar, click_handler];
    }

    class ListadoDispositivos extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListadoDispositivos",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Built-in value references. */
    var Symbol$1 = root.Symbol;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty$1.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /** Used for built-in method references. */
    var funcProto = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/;

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /* Built-in method references that are verified to be native. */
    var nativeCreate = getNative(Object, 'create');

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
    }

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /* Built-in method references that are verified to be native. */
    var Map$1 = getNative(root, 'Map');

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map$1 || ListCache),
        'string': new Hash
      };
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /** Error message constants. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /** Used as the maximum memoize cache size. */
    var MAX_MEMOIZE_SIZE = 500;

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    function createObjectWithDefaultValue(defaultValue = '') {
      return new Proxy(
        {},
        {
          get: function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property)
              ? object[property]
              : defaultValue;
          },
        }
      );
    }

    function deepCopy(src) {
      return JSON.parse(JSON.stringify(src));
    }

    /* home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Form.svelte generated by Svelte v3.24.1 */
    const file$b = "home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Form.svelte";

    const get_default_slot_changes$1 = dirty => ({
    	isSubmitting: dirty & /*$isSubmitting*/ 32,
    	isValid: dirty & /*isValid*/ 1,
    	values: dirty & /*$values*/ 4,
    	errors: dirty & /*$errors*/ 16,
    	touched: dirty & /*$touched*/ 8
    });

    const get_default_slot_context$1 = ctx => ({
    	isSubmitting: /*$isSubmitting*/ ctx[5],
    	isValid: /*isValid*/ ctx[0],
    	setValue: /*setValue*/ ctx[13],
    	touchField: /*touchField*/ ctx[12],
    	validate: /*validate*/ ctx[11],
    	values: /*$values*/ ctx[2],
    	errors: /*$errors*/ ctx[4],
    	touched: /*$touched*/ ctx[3]
    });

    function create_fragment$e(ctx) {
    	let form_1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[21].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			form_1 = element("form");
    			if (default_slot) default_slot.c();
    			attr_dev(form_1, "class", "sveltejs-forms");
    			add_location(form_1, file$b, 126, 0, 3070);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form_1, anchor);

    			if (default_slot) {
    				default_slot.m(form_1, null);
    			}

    			/*form_1_binding*/ ctx[22](form_1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(form_1, "submit", prevent_default(/*handleSubmit*/ ctx[15]), false, true, false),
    					listen_dev(form_1, "reset", /*handleResetClick*/ ctx[14], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, $isSubmitting, isValid, $values, $errors, $touched*/ 1048637) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[20], dirty, get_default_slot_changes$1, get_default_slot_context$1);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form_1);
    			if (default_slot) default_slot.d(detaching);
    			/*form_1_binding*/ ctx[22](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const FORM = {};

    function instance$e($$self, $$props, $$invalidate) {
    	let $values;
    	let $touched;
    	let $errors;
    	let $validatedValues;
    	let $isSubmitting;
    	let { initialValues = {} } = $$props;
    	let { schema = null } = $$props;
    	let { validateOnChange = true } = $$props;
    	let { validateOnBlur = true } = $$props;
    	const dispatch = createEventDispatcher();
    	const values = writable(createObjectWithDefaultValue());
    	validate_store(values, "values");
    	component_subscribe($$self, values, value => $$invalidate(2, $values = value));
    	const validatedValues = writable({});
    	validate_store(validatedValues, "validatedValues");
    	component_subscribe($$self, validatedValues, value => $$invalidate(24, $validatedValues = value));
    	const errors = writable({});
    	validate_store(errors, "errors");
    	component_subscribe($$self, errors, value => $$invalidate(4, $errors = value));
    	const touched = writable({});
    	validate_store(touched, "touched");
    	component_subscribe($$self, touched, value => $$invalidate(3, $touched = value));
    	const isSubmitting = writable(false);
    	validate_store(isSubmitting, "isSubmitting");
    	component_subscribe($$self, isSubmitting, value => $$invalidate(5, $isSubmitting = value));
    	let isValid;
    	let form;
    	let fields;

    	onMount(() => {
    		fields = Array.from(form.querySelectorAll("input,textarea,select")).filter(el => !!el.name).map(el => ({ path: el.name })).reduce(
    			(allElements, currentElement) => {
    				const isCurrentElement = el => el.path === currentElement.path;
    				const multiple = !!allElements.find(isCurrentElement);

    				return [
    					...allElements.filter(el => !isCurrentElement(el)),
    					{ ...currentElement, multiple }
    				];
    			},
    			[]
    		);

    		resetForm();
    	});

    	setContext(FORM, {
    		touchField,
    		setValue,
    		validate,
    		values,
    		errors,
    		touched,
    		isSubmitting,
    		validateOnBlur,
    		validateOnChange
    	});

    	function resetForm(data) {
    		fields.forEach(({ path, multiple }) => {
    			set_store_value(values, $values = set($values, path, get(data ? data : initialValues, path, multiple ? [] : "")));
    			set_store_value(touched, $touched = set($touched, path, false));
    		});

    		set_store_value(errors, $errors = {});
    		set_store_value(validatedValues, $validatedValues = {});
    		$$invalidate(0, isValid = undefined);
    	}

    	async function validate() {
    		if (!schema) {
    			$$invalidate(0, isValid = true);
    			return;
    		}

    		try {
    			set_store_value(validatedValues, $validatedValues = await schema.validate(deepCopy($values), { abortEarly: false, stripUnknown: true }));
    			set_store_value(errors, $errors = {});
    			$$invalidate(0, isValid = true);
    		} catch(err) {
    			set_store_value(errors, $errors = {});

    			err.inner.forEach(error => {
    				set_store_value(errors, $errors = set($errors, error.path, error.message));
    			});

    			$$invalidate(0, isValid = false);
    		}
    	}

    	function touchField(path, shouldValidate = false) {
    		if (validateOnBlur || shouldValidate) {
    			set_store_value(touched, $touched = set($touched, path, true));
    			validate();
    		}
    	}

    	function setValue(path, value, validateForm = true) {
    		set_store_value(values, $values = set($values, path, value));
    		set_store_value(touched, $touched = set($touched, path, true));

    		if (validateForm && validateOnChange) {
    			validate();
    		}
    	}

    	function handleResetClick() {
    		resetForm();
    		dispatch("reset");
    	}

    	async function handleSubmit() {
    		fields.forEach(({ path }) => set_store_value(touched, $touched = set($touched, path, true)));
    		await validate();

    		if (!schema || isValid) {
    			set_store_value(isSubmitting, $isSubmitting = true);

    			dispatch("submit", {
    				values: schema ? { ...$validatedValues } : { ...$values },
    				setSubmitting: value => set_store_value(isSubmitting, $isSubmitting = value),
    				resetForm
    			});
    		}
    	}

    	const writable_props = ["initialValues", "schema", "validateOnChange", "validateOnBlur"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Form", $$slots, ['default']);

    	function form_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			form = $$value;
    			$$invalidate(1, form);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("initialValues" in $$props) $$invalidate(16, initialValues = $$props.initialValues);
    		if ("schema" in $$props) $$invalidate(17, schema = $$props.schema);
    		if ("validateOnChange" in $$props) $$invalidate(18, validateOnChange = $$props.validateOnChange);
    		if ("validateOnBlur" in $$props) $$invalidate(19, validateOnBlur = $$props.validateOnBlur);
    		if ("$$scope" in $$props) $$invalidate(20, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		FORM,
    		setContext,
    		createEventDispatcher,
    		onMount,
    		writable,
    		set,
    		get,
    		createObjectWithDefaultValue,
    		deepCopy,
    		initialValues,
    		schema,
    		validateOnChange,
    		validateOnBlur,
    		dispatch,
    		values,
    		validatedValues,
    		errors,
    		touched,
    		isSubmitting,
    		isValid,
    		form,
    		fields,
    		resetForm,
    		validate,
    		touchField,
    		setValue,
    		handleResetClick,
    		handleSubmit,
    		$values,
    		$touched,
    		$errors,
    		$validatedValues,
    		$isSubmitting
    	});

    	$$self.$inject_state = $$props => {
    		if ("initialValues" in $$props) $$invalidate(16, initialValues = $$props.initialValues);
    		if ("schema" in $$props) $$invalidate(17, schema = $$props.schema);
    		if ("validateOnChange" in $$props) $$invalidate(18, validateOnChange = $$props.validateOnChange);
    		if ("validateOnBlur" in $$props) $$invalidate(19, validateOnBlur = $$props.validateOnBlur);
    		if ("isValid" in $$props) $$invalidate(0, isValid = $$props.isValid);
    		if ("form" in $$props) $$invalidate(1, form = $$props.form);
    		if ("fields" in $$props) fields = $$props.fields;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isValid,
    		form,
    		$values,
    		$touched,
    		$errors,
    		$isSubmitting,
    		values,
    		validatedValues,
    		errors,
    		touched,
    		isSubmitting,
    		validate,
    		touchField,
    		setValue,
    		handleResetClick,
    		handleSubmit,
    		initialValues,
    		schema,
    		validateOnChange,
    		validateOnBlur,
    		$$scope,
    		$$slots,
    		form_1_binding
    	];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			initialValues: 16,
    			schema: 17,
    			validateOnChange: 18,
    			validateOnBlur: 19
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get initialValues() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialValues(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get schema() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set schema(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validateOnChange() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validateOnChange(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validateOnBlur() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validateOnBlur(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Input.svelte generated by Svelte v3.24.1 */
    const file$c = "home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Input.svelte";

    // (27:2) {#if label}
    function create_if_block_2(ctx) {
    	let label_1;
    	let t;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t = text(/*label*/ ctx[1]);
    			attr_dev(label_1, "for", /*name*/ ctx[0]);
    			add_location(label_1, file$c, 27, 4, 659);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t, /*label*/ ctx[1]);

    			if (dirty & /*name*/ 1) {
    				attr_dev(label_1, "for", /*name*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(27:2) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (39:2) {:else}
    function create_else_block$2(ctx) {
    	let input;
    	let input_value_value;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{ name: /*name*/ ctx[0] },
    		{ type: /*type*/ ctx[2] },
    		{ id: /*name*/ ctx[0] },
    		{
    			value: input_value_value = get(/*$values*/ ctx[6], /*name*/ ctx[0])
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$c, 39, 4, 934);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*onBlur*/ ctx[11], false, false, false),
    					listen_dev(input, "change", /*onChange*/ ctx[10], false, false, false),
    					listen_dev(
    						input,
    						"input",
    						function () {
    							if (is_function(get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && /*onChange*/ ctx[10])) (get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && /*onChange*/ ctx[10]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*name*/ 1 && { name: /*name*/ ctx[0] },
    				dirty & /*type*/ 4 && { type: /*type*/ ctx[2] },
    				dirty & /*name*/ 1 && { id: /*name*/ ctx[0] },
    				dirty & /*$values, name*/ 65 && input_value_value !== (input_value_value = get(/*$values*/ ctx[6], /*name*/ ctx[0])) && input.value !== input_value_value && { value: input_value_value },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(39:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (30:2) {#if multiline}
    function create_if_block_1$1(ctx) {
    	let textarea;
    	let textarea_value_value;
    	let mounted;
    	let dispose;

    	let textarea_levels = [
    		{ name: /*name*/ ctx[0] },
    		{ id: /*name*/ ctx[0] },
    		{
    			value: textarea_value_value = get(/*$values*/ ctx[6], /*name*/ ctx[0])
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let textarea_data = {};

    	for (let i = 0; i < textarea_levels.length; i += 1) {
    		textarea_data = assign(textarea_data, textarea_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			set_attributes(textarea, textarea_data);
    			add_location(textarea, file$c, 30, 4, 723);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "blur", /*onBlur*/ ctx[11], false, false, false),
    					listen_dev(textarea, "change", /*onChange*/ ctx[10], false, false, false),
    					listen_dev(
    						textarea,
    						"input",
    						function () {
    							if (is_function(get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && /*onChange*/ ctx[10])) (get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && /*onChange*/ ctx[10]).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
    				dirty & /*name*/ 1 && { name: /*name*/ ctx[0] },
    				dirty & /*name*/ 1 && { id: /*name*/ ctx[0] },
    				dirty & /*$values, name*/ 65 && textarea_value_value !== (textarea_value_value = get(/*$values*/ ctx[6], /*name*/ ctx[0])) && { value: textarea_value_value },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(30:2) {#if multiline}",
    		ctx
    	});

    	return block;
    }

    // (50:2) {#if get($touched, name) && get($errors, name)}
    function create_if_block$3(ctx) {
    	let div;
    	let t_value = get(/*$errors*/ ctx[5], /*name*/ ctx[0]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "message");
    			add_location(div, file$c, 50, 4, 1203);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$errors, name*/ 33 && t_value !== (t_value = get(/*$errors*/ ctx[5], /*name*/ ctx[0]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(50:2) {#if get($touched, name) && get($errors, name)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let show_if = get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && get(/*$errors*/ ctx[5], /*name*/ ctx[0]);
    	let if_block0 = /*label*/ ctx[1] && create_if_block_2(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*multiline*/ ctx[3]) return create_if_block_1$1;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);
    	let if_block2 = show_if && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(div, "class", "field");
    			toggle_class(div, "error", get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && get(/*$errors*/ ctx[5], /*name*/ ctx[0]));
    			add_location(div, file$c, 25, 0, 565);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			if_block1.m(div, null);
    			append_dev(div, t1);
    			if (if_block2) if_block2.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*label*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			}

    			if (dirty & /*$touched, name, $errors*/ 49) show_if = get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && get(/*$errors*/ ctx[5], /*name*/ ctx[0]);

    			if (show_if) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$3(ctx);
    					if_block2.c();
    					if_block2.m(div, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty & /*get, $touched, name, $errors*/ 49) {
    				toggle_class(div, "error", get(/*$touched*/ ctx[4], /*name*/ ctx[0]) && get(/*$errors*/ ctx[5], /*name*/ ctx[0]));
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	const omit_props_names = ["name","label","type","multiline"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $touched;
    	let $errors;
    	let $values;
    	let { name } = $$props;
    	let { label = "" } = $$props;
    	let { type = "text" } = $$props;
    	let { multiline = false } = $$props;
    	const { touchField, setValue, values, errors, touched } = getContext(FORM);
    	validate_store(values, "values");
    	component_subscribe($$self, values, value => $$invalidate(6, $values = value));
    	validate_store(errors, "errors");
    	component_subscribe($$self, errors, value => $$invalidate(5, $errors = value));
    	validate_store(touched, "touched");
    	component_subscribe($$self, touched, value => $$invalidate(4, $touched = value));

    	function onChange(event) {
    		setValue(name, event.target.value);
    	}

    	function onBlur() {
    		touchField(name);
    	}

    	if (Object.keys($$restProps).includes("value")) {
    		setTimeout(() => setValue(name, $$restProps.value, false), 0);
    	}

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Input", $$slots, []);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("name" in $$new_props) $$invalidate(0, name = $$new_props.name);
    		if ("label" in $$new_props) $$invalidate(1, label = $$new_props.label);
    		if ("type" in $$new_props) $$invalidate(2, type = $$new_props.type);
    		if ("multiline" in $$new_props) $$invalidate(3, multiline = $$new_props.multiline);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get,
    		FORM,
    		name,
    		label,
    		type,
    		multiline,
    		touchField,
    		setValue,
    		values,
    		errors,
    		touched,
    		onChange,
    		onBlur,
    		$touched,
    		$errors,
    		$values
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("name" in $$props) $$invalidate(0, name = $$new_props.name);
    		if ("label" in $$props) $$invalidate(1, label = $$new_props.label);
    		if ("type" in $$props) $$invalidate(2, type = $$new_props.type);
    		if ("multiline" in $$props) $$invalidate(3, multiline = $$new_props.multiline);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		label,
    		type,
    		multiline,
    		$touched,
    		$errors,
    		$values,
    		values,
    		errors,
    		touched,
    		onChange,
    		onBlur,
    		$$restProps
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { name: 0, label: 1, type: 2, multiline: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<Input> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiline() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiline(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Select.svelte generated by Svelte v3.24.1 */
    const file$d = "home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Select.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (26:2) {#if label}
    function create_if_block_1$2(ctx) {
    	let label_1;
    	let t;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t = text(/*label*/ ctx[1]);
    			attr_dev(label_1, "for", /*name*/ ctx[0]);
    			add_location(label_1, file$d, 26, 4, 621);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t, /*label*/ ctx[1]);

    			if (dirty & /*name, options*/ 5) {
    				attr_dev(label_1, "for", /*name*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(26:2) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (37:4) {#each options as option}
    function create_each_block$1(ctx) {
    	let option;
    	let t0_value = /*option*/ ctx[14].title + "";
    	let t0;
    	let t1;
    	let option_value_value;
    	let option_selected_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t0 = text(t0_value);
    			t1 = space();
    			option.__value = option_value_value = /*option*/ ctx[14].id;
    			option.value = option.__value;
    			option.selected = option_selected_value = get(/*$values*/ ctx[5], /*name*/ ctx[0]) === /*option*/ ctx[14].id;
    			add_location(option, file$d, 37, 6, 857);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t0);
    			append_dev(option, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options*/ 4 && t0_value !== (t0_value = /*option*/ ctx[14].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*options*/ 4 && option_value_value !== (option_value_value = /*option*/ ctx[14].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}

    			if (dirty & /*$values, name, options*/ 37 && option_selected_value !== (option_selected_value = get(/*$values*/ ctx[5], /*name*/ ctx[0]) === /*option*/ ctx[14].id)) {
    				prop_dev(option, "selected", option_selected_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(37:4) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {#if get($touched, name) && get($errors, name)}
    function create_if_block$4(ctx) {
    	let div;
    	let t_value = get(/*$errors*/ ctx[4], /*name*/ ctx[0]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "message");
    			add_location(div, file$d, 43, 4, 1045);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$errors, name*/ 17 && t_value !== (t_value = get(/*$errors*/ ctx[4], /*name*/ ctx[0]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(43:2) {#if get($touched, name) && get($errors, name)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div;
    	let t0;
    	let select;
    	let option;
    	let select_value_value;
    	let t1;
    	let show_if = get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]);
    	let mounted;
    	let dispose;
    	let if_block0 = /*label*/ ctx[1] && create_if_block_1$2(ctx);
    	let each_value = /*options*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	let select_levels = [
    		{ name: /*name*/ ctx[0] },
    		{ id: /*name*/ ctx[0] },
    		{
    			value: select_value_value = get(/*$values*/ ctx[5], /*name*/ ctx[0])
    		},
    		/*$$restProps*/ ctx[11]
    	];

    	let select_data = {};

    	for (let i = 0; i < select_levels.length; i += 1) {
    		select_data = assign(select_data, select_levels[i]);
    	}

    	let if_block1 = show_if && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			select = element("select");
    			option = element("option");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			if (if_block1) if_block1.c();
    			option.__value = "";
    			option.value = option.__value;
    			add_location(option, file$d, 35, 4, 801);
    			set_attributes(select, select_data);
    			add_location(select, file$d, 28, 2, 665);
    			attr_dev(div, "class", "field");
    			toggle_class(div, "error", get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]));
    			add_location(div, file$d, 24, 0, 527);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			append_dev(div, select);
    			append_dev(select, option);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			if (select_data.multiple) select_options(select, select_data.value);
    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*onChange*/ ctx[9], false, false, false),
    					listen_dev(select, "blur", /*onBlur*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*label*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*options, get, $values, name*/ 37) {
    				each_value = /*options*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			set_attributes(select, select_data = get_spread_update(select_levels, [
    				dirty & /*name*/ 1 && { name: /*name*/ ctx[0] },
    				dirty & /*name*/ 1 && { id: /*name*/ ctx[0] },
    				dirty & /*$values, name*/ 33 && select_value_value !== (select_value_value = get(/*$values*/ ctx[5], /*name*/ ctx[0])) && { value: select_value_value },
    				dirty & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11]
    			]));

    			if (dirty & /*name, get, $values, $$restProps*/ 2081 && select_data.multiple) select_options(select, select_data.value);
    			if (dirty & /*$touched, name, $errors*/ 25) show_if = get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]);

    			if (show_if) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*get, $touched, name, $errors*/ 25) {
    				toggle_class(div, "error", get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]));
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	const omit_props_names = ["name","label","options"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $touched;
    	let $errors;
    	let $values;
    	let { name } = $$props;
    	let { label = "" } = $$props;
    	let { options } = $$props;
    	const { touchField, setValue, values, errors, touched } = getContext(FORM);
    	validate_store(values, "values");
    	component_subscribe($$self, values, value => $$invalidate(5, $values = value));
    	validate_store(errors, "errors");
    	component_subscribe($$self, errors, value => $$invalidate(4, $errors = value));
    	validate_store(touched, "touched");
    	component_subscribe($$self, touched, value => $$invalidate(3, $touched = value));

    	function onChange(event) {
    		setValue(name, event.target.value);
    	}

    	function onBlur() {
    		touchField(name);
    	}

    	if (Object.keys($$restProps).includes("value")) {
    		setTimeout(() => setValue(name, $$restProps.value, false), 0);
    	}

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Select", $$slots, []);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("name" in $$new_props) $$invalidate(0, name = $$new_props.name);
    		if ("label" in $$new_props) $$invalidate(1, label = $$new_props.label);
    		if ("options" in $$new_props) $$invalidate(2, options = $$new_props.options);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get,
    		FORM,
    		name,
    		label,
    		options,
    		touchField,
    		setValue,
    		values,
    		errors,
    		touched,
    		onChange,
    		onBlur,
    		$touched,
    		$errors,
    		$values
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("name" in $$props) $$invalidate(0, name = $$new_props.name);
    		if ("label" in $$props) $$invalidate(1, label = $$new_props.label);
    		if ("options" in $$props) $$invalidate(2, options = $$new_props.options);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		label,
    		options,
    		$touched,
    		$errors,
    		$values,
    		values,
    		errors,
    		touched,
    		onChange,
    		onBlur,
    		$$restProps
    	];
    }

    class Select extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { name: 0, label: 1, options: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Select",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<Select> was created without expected prop 'name'");
    		}

    		if (/*options*/ ctx[2] === undefined && !("options" in props)) {
    			console.warn("<Select> was created without expected prop 'options'");
    		}
    	}

    	get name() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function writableDerived(origins, derive, reflect, initial) {
    	var childDerivedSetter, originValues, allowDerive = true;
    	var reflectOldValues = "withOld" in reflect;
    	var wrappedDerive = (got, set) => {
    		childDerivedSetter = set;
    		if (reflectOldValues) {
    			originValues = got;
    		}
    		if (allowDerive) {
    			let returned = derive(got, set);
    			if (derive.length < 2) {
    				set(returned);
    			} else {
    				return returned;
    			}
    		}
    	};
    	var childDerived = derived(origins, wrappedDerive, initial);
    	
    	var singleOrigin = !Array.isArray(origins);
    	var sendUpstream = (setWith) => {
    		allowDerive = false;
    		if (singleOrigin) {
    			origins.set(setWith);
    		} else {
    			setWith.forEach( (value, i) => {
    				origins[i].set(value);
    			} );
    		}
    		allowDerive = true;
    	};
    	if (reflectOldValues) {
    		reflect = reflect.withOld;
    	}
    	var reflectIsAsync = reflect.length >= (reflectOldValues ? 3 : 2);
    	var cleanup = null;
    	function doReflect(reflecting) {
    		if (cleanup) {
    			cleanup();
    			cleanup = null;
    		}

    		if (reflectOldValues) {
    			var returned = reflect(reflecting, originValues, sendUpstream);
    		} else {
    			var returned = reflect(reflecting, sendUpstream);
    		}
    		if (reflectIsAsync) {
    			if (typeof returned == "function") {
    				cleanup = returned;
    			}
    		} else {
    			sendUpstream(returned);
    		}
    	}
    	
    	var doneUpdateId = 0;
    	function update(fn) {
    		var tryingSet = false, isUpdated, updateId = doneUpdateId + 1, oldValue;
    		var unsubscribe = childDerived.subscribe( (value) => {
    			if (!tryingSet) {
    				oldValue = value;
    			} else {
    				isUpdated = true;
    			}
    		} );
    		var newValue = fn(oldValue);
    		tryingSet = true;
    		childDerivedSetter(newValue);
    		unsubscribe();
    		if (isUpdated && updateId > doneUpdateId) {
    			doneUpdateId = updateId;
    			doReflect(newValue);
    		}
    	}
    	return {
    		subscribe: childDerived.subscribe,
    		set(value) { update( () => value ); },
    		update,
    	};
    }

    /* home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Choice.svelte generated by Svelte v3.24.1 */
    const file$e = "home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/sveltejs-forms/src/components/Choice.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	return child_ctx;
    }

    // (50:4) {:else}
    function create_else_block$3(ctx) {
    	let input;
    	let input_id_value;
    	let input_value_value;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			id: input_id_value = "" + (/*name*/ ctx[0] + "-" + /*option*/ ctx[20].id)
    		},
    		{ type: "radio" },
    		{ name: /*name*/ ctx[0] },
    		{
    			__value: input_value_value = /*option*/ ctx[20].id
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			/*$$binding_groups*/ ctx[15][0].push(input);
    			add_location(input, file$e, 50, 6, 1130);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.checked = input.__value === /*$choice*/ ctx[5];

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler_1*/ ctx[16]),
    					listen_dev(input, "change", /*onChange*/ ctx[10], false, false, false),
    					listen_dev(input, "blur", /*onBlur*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*name, options*/ 3 && input_id_value !== (input_id_value = "" + (/*name*/ ctx[0] + "-" + /*option*/ ctx[20].id)) && { id: input_id_value },
    				{ type: "radio" },
    				dirty & /*name*/ 1 && { name: /*name*/ ctx[0] },
    				dirty & /*options*/ 2 && input_value_value !== (input_value_value = /*option*/ ctx[20].id) && { __value: input_value_value },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (dirty & /*$choice*/ 32) {
    				input.checked = input.__value === /*$choice*/ ctx[5];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*$$binding_groups*/ ctx[15][0].splice(/*$$binding_groups*/ ctx[15][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(50:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (40:4) {#if multiple}
    function create_if_block_2$1(ctx) {
    	let input;
    	let input_id_value;
    	let input_value_value;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			id: input_id_value = "" + (/*name*/ ctx[0] + "-" + /*option*/ ctx[20].id)
    		},
    		{ type: "checkbox" },
    		{ name: /*name*/ ctx[0] },
    		{
    			__value: input_value_value = /*option*/ ctx[20].id
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			/*$$binding_groups*/ ctx[15][0].push(input);
    			add_location(input, file$e, 40, 6, 897);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.checked = ~/*$choice*/ ctx[5].indexOf(input.__value);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[14]),
    					listen_dev(input, "change", /*onChange*/ ctx[10], false, false, false),
    					listen_dev(input, "blur", /*onBlur*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*name, options*/ 3 && input_id_value !== (input_id_value = "" + (/*name*/ ctx[0] + "-" + /*option*/ ctx[20].id)) && { id: input_id_value },
    				{ type: "checkbox" },
    				dirty & /*name*/ 1 && { name: /*name*/ ctx[0] },
    				dirty & /*options*/ 2 && input_value_value !== (input_value_value = /*option*/ ctx[20].id) && { __value: input_value_value },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (dirty & /*$choice*/ 32) {
    				input.checked = ~/*$choice*/ ctx[5].indexOf(input.__value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*$$binding_groups*/ ctx[15][0].splice(/*$$binding_groups*/ ctx[15][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(40:4) {#if multiple}",
    		ctx
    	});

    	return block;
    }

    // (61:4) {#if option.title}
    function create_if_block_1$3(ctx) {
    	let label;
    	let t_value = /*option*/ ctx[20].title + "";
    	let t;
    	let label_for_value;

    	const block = {
    		c: function create() {
    			label = element("label");
    			t = text(t_value);
    			attr_dev(label, "for", label_for_value = /*option*/ ctx[20].id);
    			add_location(label, file$e, 61, 6, 1381);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options*/ 2 && t_value !== (t_value = /*option*/ ctx[20].title + "")) set_data_dev(t, t_value);

    			if (dirty & /*options*/ 2 && label_for_value !== (label_for_value = /*option*/ ctx[20].id)) {
    				attr_dev(label, "for", label_for_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(61:4) {#if option.title}",
    		ctx
    	});

    	return block;
    }

    // (39:2) {#each options as option}
    function create_each_block$2(ctx) {
    	let t;
    	let if_block1_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*multiple*/ ctx[2]) return create_if_block_2$1;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*option*/ ctx[20].title && create_if_block_1$3(ctx);

    	const block = {
    		c: function create() {
    			if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block0.m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			}

    			if (/*option*/ ctx[20].title) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$3(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if_block0.d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(39:2) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    // (65:2) {#if get($touched, name) && get($errors, name)}
    function create_if_block$5(ctx) {
    	let div;
    	let t_value = get(/*$errors*/ ctx[4], /*name*/ ctx[0]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "message");
    			add_location(div, file$e, 65, 4, 1501);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$errors, name*/ 17 && t_value !== (t_value = get(/*$errors*/ ctx[4], /*name*/ ctx[0]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(65:2) {#if get($touched, name) && get($errors, name)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div;
    	let t;
    	let show_if = get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]);
    	let each_value = /*options*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	let if_block = show_if && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "field");
    			toggle_class(div, "error", get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]));
    			add_location(div, file$e, 37, 0, 768);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*options, name, $$restProps, $choice, onChange, onBlur, multiple*/ 7207) {
    				each_value = /*options*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*$touched, name, $errors*/ 25) show_if = get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*get, $touched, name, $errors*/ 25) {
    				toggle_class(div, "error", get(/*$touched*/ ctx[3], /*name*/ ctx[0]) && get(/*$errors*/ ctx[4], /*name*/ ctx[0]));
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	const omit_props_names = ["name","options","multiple","value"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $values;
    	let $touched;
    	let $errors;
    	let $choice;
    	let { name } = $$props;
    	let { options } = $$props;
    	let { multiple = false } = $$props;
    	let { value = "" } = $$props;
    	const { touchField, values, errors, touched, validateOnChange } = getContext(FORM);
    	validate_store(values, "values");
    	component_subscribe($$self, values, value => $$invalidate(17, $values = value));
    	validate_store(errors, "errors");
    	component_subscribe($$self, errors, value => $$invalidate(4, $errors = value));
    	validate_store(touched, "touched");
    	component_subscribe($$self, touched, value => $$invalidate(3, $touched = value));
    	const choice = writableDerived(values, $values => get($values, name, multiple ? [] : ""), newValue => set($values, name, newValue));
    	validate_store(choice, "choice");
    	component_subscribe($$self, choice, value => $$invalidate(5, $choice = value));

    	function onChange() {
    		touchField(name, validateOnChange);
    	}

    	function onBlur() {
    		touchField(name);
    	}

    	if (value) {
    		setTimeout(
    			() => {
    				choice.set(value);
    			},
    			0
    		);
    	}

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Choice", $$slots, []);
    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		$choice = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		choice.set($choice);
    	}

    	function input_change_handler_1() {
    		$choice = this.__value;
    		choice.set($choice);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("name" in $$new_props) $$invalidate(0, name = $$new_props.name);
    		if ("options" in $$new_props) $$invalidate(1, options = $$new_props.options);
    		if ("multiple" in $$new_props) $$invalidate(2, multiple = $$new_props.multiple);
    		if ("value" in $$new_props) $$invalidate(13, value = $$new_props.value);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get,
    		set,
    		writableDerived,
    		FORM,
    		name,
    		options,
    		multiple,
    		value,
    		touchField,
    		values,
    		errors,
    		touched,
    		validateOnChange,
    		choice,
    		onChange,
    		onBlur,
    		$values,
    		$touched,
    		$errors,
    		$choice
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("name" in $$props) $$invalidate(0, name = $$new_props.name);
    		if ("options" in $$props) $$invalidate(1, options = $$new_props.options);
    		if ("multiple" in $$props) $$invalidate(2, multiple = $$new_props.multiple);
    		if ("value" in $$props) $$invalidate(13, value = $$new_props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		options,
    		multiple,
    		$touched,
    		$errors,
    		$choice,
    		values,
    		errors,
    		touched,
    		choice,
    		onChange,
    		onBlur,
    		$$restProps,
    		value,
    		input_change_handler,
    		$$binding_groups,
    		input_change_handler_1
    	];
    }

    class Choice extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			name: 0,
    			options: 1,
    			multiple: 2,
    			value: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Choice",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<Choice> was created without expected prop 'name'");
    		}

    		if (/*options*/ ctx[1] === undefined && !("options" in props)) {
    			console.warn("<Choice> was created without expected prop 'options'");
    		}
    	}

    	get name() {
    		throw new Error("<Choice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Choice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<Choice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Choice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Choice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Choice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Choice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Choice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const BASE_URL$1 = "http://localhost:3001/api/v1/series/";


    async function obtenerDatos(id) {
        let respuesta = await fetch(`${BASE_URL$1}/${id}`, {
            method: 'GET',
        });

        if (respuesta.status !== 200) {
            throw new Error(`Estado HTTP ${respuesta.status}`);
        }
        return respuesta;
    }

    const seriesServicio = { obtenerDatos };

    /* src/componentes/Dispositivo.svelte generated by Svelte v3.24.1 */

    const { console: console_1 } = globals;
    const file$f = "src/componentes/Dispositivo.svelte";

    // (81:4) {#if dispositivo}
    function create_if_block$6(ctx) {
    	let p0;
    	let t0_value = /*dispositivo*/ ctx[0].id + "";
    	let t0;
    	let t1;
    	let form;
    	let t2;
    	let p1;
    	let t3_value = /*dispositivo*/ ctx[0].denominacion + "";
    	let t3;
    	let t4;
    	let a0;
    	let button0;
    	let t5;
    	let a1;
    	let button1;
    	let current;

    	form = new Form({
    			props: {
    				schema: /*schema*/ ctx[1],
    				validateOnChange: true,
    				validateOnBlur: true,
    				i: true,
    				$$slots: {
    					default: [
    						create_default_slot_4$1,
    						({ isSubmitting }) => ({ 6: isSubmitting }),
    						({ isSubmitting }) => isSubmitting ? 64 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	form.$on("submit", guardar);
    	form.$on("reset", resetear);

    	button0 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(form.$$.fragment);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			a0 = element("a");
    			create_component(button0.$$.fragment);
    			t5 = space();
    			a1 = element("a");
    			create_component(button1.$$.fragment);
    			add_location(p0, file$f, 81, 8, 2381);
    			add_location(p1, file$f, 103, 8, 2900);
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$f, 104, 8, 2942);
    			attr_dev(a1, "href", "/dispositivos");
    			add_location(a1, file$f, 109, 8, 3074);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			insert_dev(target, t1, anchor);
    			mount_component(form, target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, a0, anchor);
    			mount_component(button0, a0, null);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, a1, anchor);
    			mount_component(button1, a1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*dispositivo*/ 1) && t0_value !== (t0_value = /*dispositivo*/ ctx[0].id + "")) set_data_dev(t0, t0_value);
    			const form_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				form_changes.$$scope = { dirty, ctx };
    			}

    			form.$set(form_changes);
    			if ((!current || dirty & /*dispositivo*/ 1) && t3_value !== (t3_value = /*dispositivo*/ ctx[0].denominacion + "")) set_data_dev(t3, t3_value);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			destroy_component(form, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(a0);
    			destroy_component(button0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(a1);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(81:4) {#if dispositivo}",
    		ctx
    	});

    	return block;
    }

    // (83:8) <Form             {schema}             validateOnChange={true}             validateOnBlur={true}             on:submit={guardar}             on:reset={resetear}      i       let:isSubmitting>
    function create_default_slot_4$1(ctx) {
    	let input0;
    	let t0;
    	let input1;
    	let t1;
    	let input2;
    	let current;

    	input0 = new Input({
    			props: {
    				name: "denominacion",
    				label: "Denominación"
    			},
    			$$inline: true
    		});

    	input1 = new Input({
    			props: { name: "longitud", label: "Longitud" },
    			$$inline: true
    		});

    	input2 = new Input({
    			props: { name: "latitud", label: "Latitud" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(input0.$$.fragment);
    			t0 = space();
    			create_component(input1.$$.fragment);
    			t1 = space();
    			create_component(input2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(input0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(input1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(input2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input0.$$.fragment, local);
    			transition_in(input1.$$.fragment, local);
    			transition_in(input2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input0.$$.fragment, local);
    			transition_out(input1.$$.fragment, local);
    			transition_out(input2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(input0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(input1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(input2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(83:8) <Form             {schema}             validateOnChange={true}             validateOnBlur={true}             on:submit={guardar}             on:reset={resetear}      i       let:isSubmitting>",
    		ctx
    	});

    	return block;
    }

    // (107:16) <Label>
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Mapa");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(107:16) <Label>",
    		ctx
    	});

    	return block;
    }

    // (106:12) <Button variant="outlined">
    function create_default_slot_2$1(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(106:12) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (112:16) <Label>
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Listado");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(112:16) <Label>",
    		ctx
    	});

    	return block;
    }

    // (111:12) <Button variant="outlined">
    function create_default_slot$2(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(111:12) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let current;
    	let if_block = /*dispositivo*/ ctx[0] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "Dispositivo";
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(h2, "class", "svelte-f9adgw");
    			add_location(h2, file$f, 79, 4, 2330);
    			add_location(main, file$f, 78, 0, 2319);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			if (if_block) if_block.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*dispositivo*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*dispositivo*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(main, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function resetear() {
    	console.log("form has been reset");
    }

    function guardar({ detail: { values, setSubmitting, resetForm } }) {
    	setTimeout(
    		() => {
    			formValues = values;
    			setSubmitting(false);
    			resetForm();
    		},
    		1000
    	);
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { id } = $$props;

    	// datos obtenidos del backend
    	let dispositivo;

    	let seriesHumedad;
    	let seriesTemperatura;

    	// datos formulario
    	let valoresFormulario;

    	onMount(async () => {
    		await dispositivosServicio.obtenerDispositivo(id).then(respuesta => respuesta.json()).then(resultado => $$invalidate(0, dispositivo = resultado));
    		await seriesServicio.obtenerDatos(id + "-Humedad").then(respuesta => respuesta.json()).then(resultado => seriesHumedad = resultado);
    		await seriesServicio.obtenerDatos(id + "-Temperatura").then(respuesta => respuesta.json()).then(respuesta => seriesTemperatura = respuesta);
    		console.log(seriesHumedad);
    		console.log(seriesTemperatura);
    		console.log(seriesHumedad.length);

    		for (let i = 0; i < seriesHumedad.length; i++) {
    			console.log(new Date(seriesHumedad[i][0]).toString());
    		}
    	});

    	const schema = yup.object().shape({
    		denominacion: yup.string().required("Debe especificar la denominacion del dispositivo"),
    		latitud: yup.number().required("Debe especificar la ubicacion (latitud) del dispositivo"),
    		longitud: yup.number().required("Debe especificar la ubicacion (longitud) del dispositivo")
    	});

    	const writable_props = ["id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Dispositivo> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Dispositivo", $$slots, []);

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(2, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Button: Button_1,
    		Label,
    		Icon,
    		Form,
    		Input,
    		Select,
    		Choice,
    		dispositivosServicio,
    		seriesServicio,
    		id,
    		dispositivo,
    		seriesHumedad,
    		seriesTemperatura,
    		valoresFormulario,
    		resetear,
    		guardar,
    		schema
    	});

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(2, id = $$props.id);
    		if ("dispositivo" in $$props) $$invalidate(0, dispositivo = $$props.dispositivo);
    		if ("seriesHumedad" in $$props) seriesHumedad = $$props.seriesHumedad;
    		if ("seriesTemperatura" in $$props) seriesTemperatura = $$props.seriesTemperatura;
    		if ("valoresFormulario" in $$props) valoresFormulario = $$props.valoresFormulario;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [dispositivo, schema, id];
    }

    class Dispositivo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { id: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dispositivo",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[2] === undefined && !("id" in props)) {
    			console_1.warn("<Dispositivo> was created without expected prop 'id'");
    		}
    	}

    	get id() {
    		throw new Error("<Dispositivo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Dispositivo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var frappeCharts_min_cjs = createCommonjsModule(function (module, exports) {
    function styleInject(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&i.firstChild?i.insertBefore(a,i.firstChild):i.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t));}}function $(t,e){return "string"==typeof t?(e||document).querySelector(t):t||null}function getOffset(t){var e=t.getBoundingClientRect();return {top:e.top+(document.documentElement.scrollTop||document.body.scrollTop),left:e.left+(document.documentElement.scrollLeft||document.body.scrollLeft)}}function isHidden(t){return null===t.offsetParent}function isElementInViewport(t){var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function getElementContentWidth(t){var e=window.getComputedStyle(t),n=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight);return t.clientWidth-n}function fire(t,e,n){var i=document.createEvent("HTMLEvents");i.initEvent(e,!0,!0);for(var a in n)i[a]=n[a];return t.dispatchEvent(i)}function getTopOffset(t){return t.titleHeight+t.margins.top+t.paddings.top}function getLeftOffset(t){return t.margins.left+t.paddings.left}function getExtraHeight(t){return t.margins.top+t.margins.bottom+t.paddings.top+t.paddings.bottom+t.titleHeight+t.legendHeight}function getExtraWidth(t){return t.margins.left+t.margins.right+t.paddings.left+t.paddings.right}function _classCallCheck$4(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function floatTwo(t){return parseFloat(t.toFixed(2))}function fillArray(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];n||(n=i?t[0]:t[t.length-1]);var a=new Array(Math.abs(e)).fill(n);return t=i?a.concat(t):t.concat(a)}function getStringWidth(t,e){return (t+"").length*e}function getPositionByAngle(t,e){return {x:Math.sin(t*ANGLE_RATIO)*e,y:Math.cos(t*ANGLE_RATIO)*e}}function isValidNumber(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return !Number.isNaN(t)&&(void 0!==t&&(!!Number.isFinite(t)&&!(e&&t<0)))}function getBarHeightAndYAttr(t,e){var n=void 0,i=void 0;return t<=e?(n=e-t,i=t):(n=t-e,i=e),[n,i]}function equilizeNoOfElements(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length-t.length;return n>0?t=fillArray(t,n):e=fillArray(e,n),[t,e]}function truncateString(t,e){if(t)return t.length>e?t.slice(0,e-3)+"...":t}function shortenLargeNumber(t){var e=void 0;if("number"==typeof t)e=t;else if("string"==typeof t&&(e=Number(t),Number.isNaN(e)))return t;var n=Math.floor(Math.log10(Math.abs(e)));if(n<=2)return e;var i=Math.floor(n/3),a=Math.pow(10,n-3*i)*+(e/Math.pow(10,n)).toFixed(1);return Math.round(100*a)/100+" "+["","K","M","B","T"][i]}function getSplineCurvePointsStr(t,e){for(var n=[],i=0;i<t.length;i++)n.push([t[i],e[i]]);var a=function(t,e){var n=e[0]-t[0],i=e[1]-t[1];return {length:Math.sqrt(Math.pow(n,2)+Math.pow(i,2)),angle:Math.atan2(i,n)}},r=function(t,e,n,i){var r=a(e||t,n||t),s=r.angle+(i?Math.PI:0),o=.2*r.length;return [t[0]+Math.cos(s)*o,t[1]+Math.sin(s)*o]};return function(t,e){return t.reduce(function(t,n,i,a){return 0===i?n[0]+","+n[1]:t+" "+e(n,i,a)},"")}(n,function(t,e,n){var i=r(n[e-1],n[e-2],t),a=r(t,n[e-1],n[e+1],!0);return "C "+i[0]+","+i[1]+" "+a[0]+","+a[1]+" "+t[0]+","+t[1]})}function limitColor(t){return t>255?255:t<0?0:t}function lightenDarkenColor(t,e){var n=getColor(t),i=!1;"#"==n[0]&&(n=n.slice(1),i=!0);var a=parseInt(n,16),r=limitColor((a>>16)+e),s=limitColor((a>>8&255)+e),o=limitColor((255&a)+e);return (i?"#":"")+(o|s<<8|r<<16).toString(16)}function isValidColor(t){var e=/(^\s*)(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i;return /(^\s*)(#)((?:[A-Fa-f0-9]{3}){1,2})$/i.test(t)||e.test(t)}function $$1(t,e){return "string"==typeof t?(e||document).querySelector(t):t||null}function createSVG(t,e){var n=document.createElementNS("http://www.w3.org/2000/svg",t);for(var i in e){var a=e[i];if("inside"===i)$$1(a).appendChild(n);else if("around"===i){var r=$$1(a);r.parentNode.insertBefore(n,r),n.appendChild(r);}else "styles"===i?"object"===(void 0===a?"undefined":_typeof$1(a))&&Object.keys(a).map(function(t){n.style[t]=a[t];}):("className"===i&&(i="class"),"innerHTML"===i?n.textContent=a:n.setAttribute(i,a));}return n}function renderVerticalGradient(t,e){return createSVG("linearGradient",{inside:t,id:e,x1:0,x2:0,y1:0,y2:1})}function setGradientStop(t,e,n,i){return createSVG("stop",{inside:t,style:"stop-color: "+n,offset:e,"stop-opacity":i})}function makeSVGContainer(t,e,n,i){return createSVG("svg",{className:e,inside:t,width:n,height:i})}function makeSVGDefs(t){return createSVG("defs",{inside:t})}function makeSVGGroup(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,i={className:t,transform:e};return n&&(i.inside=n),createSVG("g",i)}function makePath(t){return createSVG("path",{className:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",d:t,styles:{stroke:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",fill:arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none","stroke-width":arguments.length>4&&void 0!==arguments[4]?arguments[4]:2}})}function makeArcPathStr(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=n.x+t.x,o=n.y+t.y,l=n.x+e.x,u=n.y+e.y;return "M"+n.x+" "+n.y+"\n\t\tL"+s+" "+o+"\n\t\tA "+i+" "+i+" 0 "+r+" "+(a?1:0)+"\n\t\t"+l+" "+u+" z"}function makeCircleStr(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=n.x+t.x,o=n.y+t.y,l=n.x+e.x,u=2*n.y,c=n.y+e.y;return "M"+n.x+" "+n.y+"\n\t\tL"+s+" "+o+"\n\t\tA "+i+" "+i+" 0 "+r+" "+(a?1:0)+"\n\t\t"+l+" "+u+" z\n\t\tL"+s+" "+u+"\n\t\tA "+i+" "+i+" 0 "+r+" "+(a?1:0)+"\n\t\t"+l+" "+c+" z"}function makeArcStrokePathStr(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=n.x+t.x,o=n.y+t.y,l=n.x+e.x,u=n.y+e.y;return "M"+s+" "+o+"\n\t\tA "+i+" "+i+" 0 "+r+" "+(a?1:0)+"\n\t\t"+l+" "+u}function makeStrokeCircleStr(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=n.x+t.x,o=n.y+t.y,l=n.x+e.x,u=2*i+o,c=n.y+t.y;return "M"+s+" "+o+"\n\t\tA "+i+" "+i+" 0 "+r+" "+(a?1:0)+"\n\t\t"+l+" "+u+"\n\t\tM"+s+" "+u+"\n\t\tA "+i+" "+i+" 0 "+r+" "+(a?1:0)+"\n\t\t"+l+" "+c}function makeGradient(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i="path-fill-gradient-"+e+"-"+(n?"lighter":"default"),a=renderVerticalGradient(t,i),r=[1,.6,.2];return n&&(r=[.4,.2,0]),setGradientStop(a,"0%",e,r[0]),setGradientStop(a,"50%",e,r[1]),setGradientStop(a,"100%",e,r[2]),i}function percentageBar(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:PERCENTAGE_BAR_DEFAULT_DEPTH,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none";return createSVG("rect",{className:"percentage-bar",x:t,y:e,width:n,height:i,fill:r,styles:{stroke:lightenDarkenColor(r,-25),"stroke-dasharray":"0, "+(i+n)+", "+n+", "+i,"stroke-width":a}})}function heatSquare(t,e,n,i,a){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none",s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{},o={className:t,x:e,y:n,width:i,height:i,rx:a,fill:r};return Object.keys(s).map(function(t){o[t]=s[t];}),createSVG("rect",o)}function legendBar(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",a=arguments[4];a=arguments.length>5&&void 0!==arguments[5]&&arguments[5]?truncateString(a,LABEL_MAX_CHARS):a;var r={className:"legend-bar",x:0,y:0,width:n,height:"2px",fill:i},s=createSVG("text",{className:"legend-dataset-text",x:0,y:0,dy:2*FONT_SIZE+"px","font-size":1.2*FONT_SIZE+"px","text-anchor":"start",fill:FONT_FILL,innerHTML:a}),o=createSVG("g",{transform:"translate("+t+", "+e+")"});return o.appendChild(createSVG("rect",r)),o.appendChild(s),o}function legendDot(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",a=arguments[4];a=arguments.length>5&&void 0!==arguments[5]&&arguments[5]?truncateString(a,LABEL_MAX_CHARS):a;var r={className:"legend-dot",cx:0,cy:0,r:n,fill:i},s=createSVG("text",{className:"legend-dataset-text",x:0,y:0,dx:FONT_SIZE+"px",dy:FONT_SIZE/3+"px","font-size":1.2*FONT_SIZE+"px","text-anchor":"start",fill:FONT_FILL,innerHTML:a}),o=createSVG("g",{transform:"translate("+t+", "+e+")"});return o.appendChild(createSVG("circle",r)),o.appendChild(s),o}function makeText(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=a.fontSize||FONT_SIZE;return createSVG("text",{className:t,x:e,y:n,dy:(void 0!==a.dy?a.dy:r/2)+"px","font-size":r+"px",fill:a.fill||FONT_FILL,"text-anchor":a.textAnchor||"start",innerHTML:i})}function makeVertLine(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};a.stroke||(a.stroke=BASE_LINE_COLOR);var r=createSVG("line",{className:"line-vertical "+a.className,x1:0,x2:0,y1:n,y2:i,styles:{stroke:a.stroke}}),s=createSVG("text",{x:0,y:n>i?n+LABEL_MARGIN:n-LABEL_MARGIN-FONT_SIZE,dy:FONT_SIZE+"px","font-size":FONT_SIZE+"px","text-anchor":"middle",innerHTML:e+""}),o=createSVG("g",{transform:"translate("+t+", 0)"});return o.appendChild(r),o.appendChild(s),o}function makeHoriLine(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};a.stroke||(a.stroke=BASE_LINE_COLOR),a.lineType||(a.lineType=""),a.shortenNumbers&&(e=shortenLargeNumber(e));var r=createSVG("line",{className:"line-horizontal "+a.className+("dashed"===a.lineType?"dashed":""),x1:n,x2:i,y1:0,y2:0,styles:{stroke:a.stroke}}),s=createSVG("text",{x:n<i?n-LABEL_MARGIN:n+LABEL_MARGIN,y:0,dy:FONT_SIZE/2-2+"px","font-size":FONT_SIZE+"px","text-anchor":n<i?"end":"start",innerHTML:e+""}),o=createSVG("g",{transform:"translate(0, "+t+")","stroke-opacity":1});return 0!==s&&"0"!==s||(o.style.stroke="rgba(27, 31, 35, 0.6)"),o.appendChild(r),o.appendChild(s),o}function yLine(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};isValidNumber(t)||(t=0),i.pos||(i.pos="left"),i.offset||(i.offset=0),i.mode||(i.mode="span"),i.stroke||(i.stroke=BASE_LINE_COLOR),i.className||(i.className="");var a=-1*AXIS_TICK_LENGTH,r="span"===i.mode?n+AXIS_TICK_LENGTH:0;return "tick"===i.mode&&"right"===i.pos&&(a=n+AXIS_TICK_LENGTH,r=n),a+=i.offset,r+=i.offset,makeHoriLine(t,e,a,r,{stroke:i.stroke,className:i.className,lineType:i.lineType,shortenNumbers:i.shortenNumbers})}function xLine(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};isValidNumber(t)||(t=0),i.pos||(i.pos="bottom"),i.offset||(i.offset=0),i.mode||(i.mode="span"),i.stroke||(i.stroke=BASE_LINE_COLOR),i.className||(i.className="");var a=n+AXIS_TICK_LENGTH,r="span"===i.mode?-1*AXIS_TICK_LENGTH:n;return "tick"===i.mode&&"top"===i.pos&&(a=-1*AXIS_TICK_LENGTH,r=0),makeVertLine(t,e,a,r,{stroke:i.stroke,className:i.className,lineType:i.lineType})}function yMarker(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};i.labelPos||(i.labelPos="right");var a=createSVG("text",{className:"chart-label",x:"left"===i.labelPos?LABEL_MARGIN:n-getStringWidth(e,5)-LABEL_MARGIN,y:0,dy:FONT_SIZE/-2+"px","font-size":FONT_SIZE+"px","text-anchor":"start",innerHTML:e+""}),r=makeHoriLine(t,"",0,n,{stroke:i.stroke||BASE_LINE_COLOR,className:i.className||"",lineType:i.lineType});return r.appendChild(a),r}function yRegion(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=t-e,s=createSVG("rect",{className:"bar mini",styles:{fill:"rgba(228, 234, 239, 0.49)",stroke:BASE_LINE_COLOR,"stroke-dasharray":n+", "+r},x:0,y:0,width:n,height:r});a.labelPos||(a.labelPos="right");var o=createSVG("text",{className:"chart-label",x:"left"===a.labelPos?LABEL_MARGIN:n-getStringWidth(i+"",4.5)-LABEL_MARGIN,y:0,dy:FONT_SIZE/-2+"px","font-size":FONT_SIZE+"px","text-anchor":"start",innerHTML:i+""}),l=createSVG("g",{transform:"translate(0, "+e+")"});return l.appendChild(s),l.appendChild(o),l}function datasetBar(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:{},l=getBarHeightAndYAttr(e,o.zeroLine),u=_slicedToArray(l,2),c=u[0],h=u[1];h-=s,0===c&&(c=o.minHeight,h-=o.minHeight),isValidNumber(t)||(t=0),isValidNumber(h)||(h=0),isValidNumber(c,!0)||(c=0),isValidNumber(n,!0)||(n=0);var d=createSVG("rect",{className:"bar mini",style:"fill: "+i,"data-point-index":r,x:t,y:h,width:n,height:c});if((a+="")||a.length){d.setAttribute("y",0),d.setAttribute("x",0);var f=createSVG("text",{className:"data-point-value",x:n/2,y:0,dy:FONT_SIZE/2*-1+"px","font-size":FONT_SIZE+"px","text-anchor":"middle",innerHTML:a}),p=createSVG("g",{"data-point-index":r,transform:"translate("+t+", "+h+")"});return p.appendChild(d),p.appendChild(f),p}return d}function datasetDot(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=createSVG("circle",{style:"fill: "+i,"data-point-index":r,cx:t,cy:e,r:n});if((a+="")||a.length){s.setAttribute("cy",0),s.setAttribute("cx",0);var o=createSVG("text",{className:"data-point-value",x:0,y:0,dy:FONT_SIZE/2*-1-n+"px","font-size":FONT_SIZE+"px","text-anchor":"middle",innerHTML:a}),l=createSVG("g",{"data-point-index":r,transform:"translate("+t+", "+e+")"});return l.appendChild(s),l.appendChild(o),l}return s}function getPaths(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=e.map(function(e,n){return t[n]+","+e}).join("L");i.spline&&(r=getSplineCurvePointsStr(t,e));var s=makePath("M"+r,"line-graph-path",n);if(i.heatline){var o=makeGradient(a.svgDefs,n);s.style.stroke="url(#"+o+")";}var l={path:s};if(i.regionFill){var u=makeGradient(a.svgDefs,n,!0),c="M"+t[0]+","+a.zeroLine+"L"+r+"L"+t.slice(-1)[0]+","+a.zeroLine;l.region=makePath(c,"region-fill","none","url(#"+u+")");}return l}function translate(t,e,n,i){var a="string"==typeof e?e:e.join(", ");return [t,{transform:n.join(", ")},i,STD_EASING,"translate",{transform:a}]}function translateVertLine(t,e,n){return translate(t,[n,0],[e,0],MARKER_LINE_ANIM_DUR)}function translateHoriLine(t,e,n){return translate(t,[0,n],[0,e],MARKER_LINE_ANIM_DUR)}function animateRegion(t,e,n,i){var a=e-n,r=t.childNodes[0];return [[r,{height:a,"stroke-dasharray":r.getAttribute("width")+", "+a},MARKER_LINE_ANIM_DUR,STD_EASING],translate(t,[0,i],[0,n],MARKER_LINE_ANIM_DUR)]}function animateBar(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=getBarHeightAndYAttr(n,(arguments.length>5&&void 0!==arguments[5]?arguments[5]:{}).zeroLine),s=_slicedToArray$2(r,2),o=s[0],l=s[1];return l-=a,"rect"!==t.nodeName?[[t.childNodes[0],{width:i,height:o},UNIT_ANIM_DUR,STD_EASING],translate(t,t.getAttribute("transform").split("(")[1].slice(0,-1),[e,l],MARKER_LINE_ANIM_DUR)]:[[t,{width:i,height:o,x:e,y:l},UNIT_ANIM_DUR,STD_EASING]]}function animateDot(t,e,n){return "circle"!==t.nodeName?[translate(t,t.getAttribute("transform").split("(")[1].slice(0,-1),[e,n],MARKER_LINE_ANIM_DUR)]:[[t,{cx:e,cy:n},UNIT_ANIM_DUR,STD_EASING]]}function animatePath(t,e,n,i,a){var r=[],s=n.map(function(t,n){return e[n]+","+t}).join("L");a&&(s=getSplineCurvePointsStr(e,n));var o=[t.path,{d:"M"+s},PATH_ANIM_DUR,STD_EASING];if(r.push(o),t.region){var l=e[0]+","+i+"L",u="L"+e.slice(-1)[0]+", "+i,c=[t.region,{d:"M"+l+s+u},PATH_ANIM_DUR,STD_EASING];r.push(c);}return r}function animatePathStr(t,e){return [t,{d:e},UNIT_ANIM_DUR,STD_EASING]}function _toConsumableArray$1(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function animateSVGElement(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"linear",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},s=t.cloneNode(!0),o=t.cloneNode(!0);for(var l in e){var u=void 0;u="transform"===l?document.createElementNS("http://www.w3.org/2000/svg","animateTransform"):document.createElementNS("http://www.w3.org/2000/svg","animate");var c=r[l]||t.getAttribute(l),h=e[l],d={attributeName:l,from:c,to:h,begin:"0s",dur:n/1e3+"s",values:c+";"+h,keySplines:EASING[i],keyTimes:"0;1",calcMode:"spline",fill:"freeze"};a&&(d.type=a);for(var f in d)u.setAttribute(f,d[f]);s.appendChild(u),a?o.setAttribute(l,"translate("+h+")"):o.setAttribute(l,h);}return [s,o]}function transform(t,e){t.style.transform=e,t.style.webkitTransform=e,t.style.msTransform=e,t.style.mozTransform=e,t.style.oTransform=e;}function animateSVG(t,e){var n=[],i=[];e.map(function(t){var e=t[0],a=e.parentNode,r=void 0,s=void 0;t[0]=e;var o=animateSVGElement.apply(void 0,_toConsumableArray$1(t)),l=_slicedToArray$1(o,2);r=l[0],s=l[1],n.push(s),i.push([r,a]),a.replaceChild(r,e);});var a=t.cloneNode(!0);return i.map(function(t,i){t[1].replaceChild(n[i],t[0]),e[i][0]=n[i];}),a}function runSMILAnimation(t,e,n){if(0!==n.length){var i=animateSVG(e,n);e.parentNode==t&&(t.removeChild(e),t.appendChild(i)),setTimeout(function(){i.parentNode==t&&(t.removeChild(i),t.appendChild(e));},REPLACE_ALL_NEW_DUR);}}function downloadFile(t,e){var n=document.createElement("a");n.style="display: none";var i=new Blob(e,{type:"image/svg+xml; charset=utf-8"}),a=window.URL.createObjectURL(i);n.href=a,n.download=t,document.body.appendChild(n),n.click(),setTimeout(function(){document.body.removeChild(n),window.URL.revokeObjectURL(a);},300);}function prepareForExport(t){var e=t.cloneNode(!0);e.classList.add("chart-container"),e.setAttribute("xmlns","http://www.w3.org/2000/svg"),e.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");var n=$.create("style",{innerHTML:CSSTEXT});e.insertBefore(n,e.firstChild);var i=$.create("div");return i.appendChild(e),i.innerHTML}function _classCallCheck$3(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck$2(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$1(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$1(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}function treatAsUtc(t){var e=new Date(t);return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e}function getYyyyMmDd(t){var e=t.getDate(),n=t.getMonth()+1;return [t.getFullYear(),(n>9?"":"0")+n,(e>9?"":"0")+e].join("-")}function clone(t){return new Date(t.getTime())}function getWeeksBetween(t,e){var n=setDayToSunday(t);return Math.ceil(getDaysBetween(n,e)/NO_OF_DAYS_IN_WEEK)}function getDaysBetween(t,e){var n=SEC_IN_DAY*NO_OF_MILLIS;return (treatAsUtc(e)-treatAsUtc(t))/n}function areInSameMonth(t,e){return t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear()}function getMonthName(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=MONTH_NAMES[t];return e?n.slice(0,3):n}function getLastDateInMonth(t,e){return new Date(e,t+1,0)}function setDayToSunday(t){var e=clone(t),n=e.getDay();return 0!==n&&addDays(e,-1*n),e}function addDays(t,e){t.setDate(t.getDate()+e);}function _classCallCheck$5(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getComponent(t,e,n){var i=Object.keys(componentConfigs).filter(function(e){return t.includes(e)}),a=componentConfigs[i[0]];return Object.assign(a,{constants:e,getData:n}),new ChartComponent(a)}function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$1(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}function _toConsumableArray$2(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$6(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$2(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$2(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}function _toConsumableArray$4(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function normalize(t){if(0===t)return [0,0];if(isNaN(t))return {mantissa:-6755399441055744,exponent:972};var e=t>0?1:-1;if(!isFinite(t))return {mantissa:4503599627370496*e,exponent:972};t=Math.abs(t);var n=Math.floor(Math.log10(t));return [e*(t/Math.pow(10,n)),n]}function getChartRangeIntervals(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=Math.ceil(t),i=Math.floor(e),a=n-i,r=a,s=1;a>5&&(a%2!=0&&(a=++n-i),r=a/2,s=2),a<=2&&(s=a/(r=4)),0===a&&(r=5,s=1);for(var o=[],l=0;l<=r;l++)o.push(i+s*l);return o}function getChartIntervals(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=normalize(t),i=_slicedToArray$4(n,2),a=i[0],r=i[1],s=e?e/Math.pow(10,r):0,o=getChartRangeIntervals(a=a.toFixed(6),s);return o=o.map(function(t){return t*Math.pow(10,r)})}function calcChartIntervals(t){function e(t,e){for(var n=getChartIntervals(t),i=n[1]-n[0],a=0,r=1;a<e;r++)a+=i,n.unshift(-1*a);return n}var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=Math.max.apply(Math,_toConsumableArray$4(t)),a=Math.min.apply(Math,_toConsumableArray$4(t)),r=[];if(i>=0&&a>=0)normalize(i)[1],r=n?getChartIntervals(i,a):getChartIntervals(i);else if(i>0&&a<0){var s=Math.abs(a);i>=s?(normalize(i)[1],r=e(i,s)):(normalize(s)[1],r=e(s,i).map(function(t){return -1*t}));}else if(i<=0&&a<=0){var o=Math.abs(a),l=Math.abs(i);normalize(o)[1],r=(r=n?getChartIntervals(o,l):getChartIntervals(o)).reverse().map(function(t){return -1*t});}return r}function getZeroIndex(t){var e=getIntervalSize(t);return t.indexOf(0)>=0?t.indexOf(0):t[0]>0?-1*t[0]/e:-1*t[t.length-1]/e+(t.length-1)}function getIntervalSize(t){return t[1]-t[0]}function getValueRange(t){return t[t.length-1]-t[0]}function scale(t,e){return floatTwo(e.zeroLine-t*e.scaleMultiplier)}function getClosestInArray(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},[]);return n?e.indexOf(i):i}function calcDistribution(t,e){for(var n=Math.max.apply(Math,_toConsumableArray$4(t)),i=1/(e-1),a=[],r=0;r<e;r++){var s=n*(i*r);a.push(s);}return a}function getMaxCheckpoint(t,e){return e.filter(function(e){return e<t}).length}function _toConsumableArray$3(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$7(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$3(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$3(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}function _toConsumableArray$6(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function dataPrep(t,e){t.labels=t.labels||[];var n=t.labels.length,i=t.datasets,a=new Array(n).fill(0);return i||(i=[{values:a}]),i.map(function(t){if(t.values){var i=t.values;i=(i=i.map(function(t){return isNaN(t)?0:t})).length>n?i.slice(0,n):fillArray(i,n-i.length,0);}else t.values=a;t.chartType||(t.chartType=e);}),t.yRegions&&t.yRegions.map(function(t){if(t.end<t.start){var e=[t.end,t.start];t.start=e[0],t.end=e[1];}}),t}function zeroDataPrep(t){var e=t.labels.length,n=new Array(e).fill(0),i={labels:t.labels.slice(0,-1),datasets:t.datasets.map(function(t){return {name:"",values:n.slice(0,-1),chartType:t.chartType}})};return t.yMarkers&&(i.yMarkers=[{value:0,label:""}]),t.yRegions&&(i.yRegions=[{start:0,end:0,label:""}]),i}function getShortenedLabels(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=t/e.length;i<=0&&(i=1);var a=i/DEFAULT_CHAR_WIDTH,r=void 0;if(n){var s=Math.max.apply(Math,_toConsumableArray$6(e.map(function(t){return t.length})));r=Math.ceil(s/a);}return e.map(function(t,e){return (t+="").length>a&&(n?e%r!=0&&(t=""):t=a-3>0?t.slice(0,a-3)+" ...":t.slice(0,a)+".."),t})}function _toConsumableArray$5(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$8(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$4(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$4(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}function _toConsumableArray$7(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$9(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$5(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$5(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getChartByType(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"line",e=arguments[1],n=arguments[2];return "axis-mixed"===t?(n.type="line",new AxisChart(e,n)):chartTypes[t]?new chartTypes[t](e,n):void console.error("Undefined chart type: "+t)}Object.defineProperty(exports,"__esModule",{value:!0});var css_248z='.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}';styleInject(css_248z);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};$.create=function(t,e){var n=document.createElement(t);for(var i in e){var a=e[i];if("inside"===i)$(a).appendChild(n);else if("around"===i){var r=$(a);r.parentNode.insertBefore(n,r),n.appendChild(r);}else "styles"===i?"object"===(void 0===a?"undefined":_typeof(a))&&Object.keys(a).map(function(t){n.style[t]=a[t];}):i in n?n[i]=a:n.setAttribute(i,a);}return n};var BASE_MEASURES={margins:{top:10,bottom:10,left:20,right:20},paddings:{top:20,bottom:40,left:30,right:10},baseHeight:240,titleHeight:20,legendHeight:30,titleFontSize:12},INIT_CHART_UPDATE_TIMEOUT=700,CHART_POST_ANIMATE_TIMEOUT=400,AXIS_LEGEND_BAR_SIZE=100,BAR_CHART_SPACE_RATIO=.5,MIN_BAR_PERCENT_HEIGHT=0,LINE_CHART_DOT_SIZE=4,DOT_OVERLAY_SIZE_INCR=4,PERCENTAGE_BAR_DEFAULT_HEIGHT=20,PERCENTAGE_BAR_DEFAULT_DEPTH=2,HEATMAP_DISTRIBUTION_SIZE=5,HEATMAP_SQUARE_SIZE=10,HEATMAP_GUTTER_SIZE=2,DEFAULT_CHAR_WIDTH=7,TOOLTIP_POINTER_TRIANGLE_HEIGHT=5,DEFAULT_CHART_COLORS=["light-blue","blue","violet","red","orange","yellow","green","light-green","purple","magenta","light-grey","dark-grey"],HEATMAP_COLORS_GREEN=["#ebedf0","#c6e48b","#7bc96f","#239a3b","#196127"],DEFAULT_COLORS={bar:DEFAULT_CHART_COLORS,line:DEFAULT_CHART_COLORS,pie:DEFAULT_CHART_COLORS,percentage:DEFAULT_CHART_COLORS,heatmap:HEATMAP_COLORS_GREEN,donut:DEFAULT_CHART_COLORS},ANGLE_RATIO=Math.PI/180,FULL_ANGLE=360,_createClass$3=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),SvgTip=function(){function t(e){var n=e.parent,i=void 0===n?null:n,a=e.colors,r=void 0===a?[]:a;_classCallCheck$4(this,t),this.parent=i,this.colors=r,this.titleName="",this.titleValue="",this.listValues=[],this.titleValueFirst=0,this.x=0,this.y=0,this.top=0,this.left=0,this.setup();}return _createClass$3(t,[{key:"setup",value:function(){this.makeTooltip();}},{key:"refresh",value:function(){this.fill(),this.calcPosition();}},{key:"makeTooltip",value:function(){var t=this;this.container=$.create("div",{inside:this.parent,className:"graph-svg-tip comparison",innerHTML:'<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>'}),this.hideTip(),this.title=this.container.querySelector(".title"),this.dataPointList=this.container.querySelector(".data-point-list"),this.parent.addEventListener("mouseleave",function(){t.hideTip();});}},{key:"fill",value:function(){var t=this,e=void 0;this.index&&this.container.setAttribute("data-point-index",this.index),e=this.titleValueFirst?"<strong>"+this.titleValue+"</strong>"+this.titleName:this.titleName+"<strong>"+this.titleValue+"</strong>",this.title.innerHTML=e,this.dataPointList.innerHTML="",this.listValues.map(function(e,n){var i=t.colors[n]||"black",a=0===e.formatted||e.formatted?e.formatted:e.value,r=$.create("li",{styles:{"border-top":"3px solid "+i},innerHTML:'<strong style="display: block;">'+(0===a||a?a:"")+"</strong>\n\t\t\t\t\t"+(e.title?e.title:"")});t.dataPointList.appendChild(r);});}},{key:"calcPosition",value:function(){var t=this.container.offsetWidth;this.top=this.y-this.container.offsetHeight-TOOLTIP_POINTER_TRIANGLE_HEIGHT,this.left=this.x-t/2;var e=this.parent.offsetWidth-t,n=this.container.querySelector(".svg-pointer");if(this.left<0)n.style.left="calc(50% - "+-1*this.left+"px)",this.left=0;else if(this.left>e){var i="calc(50% + "+(this.left-e)+"px)";n.style.left=i,this.left=e;}else n.style.left="50%";}},{key:"setValues",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1;this.titleName=n.name,this.titleValue=n.value,this.listValues=i,this.x=t,this.y=e,this.titleValueFirst=n.valueFirst||0,this.index=a,this.refresh();}},{key:"hideTip",value:function(){this.container.style.top="0px",this.container.style.left="0px",this.container.style.opacity="0";}},{key:"showTip",value:function(){this.container.style.top=this.top+"px",this.container.style.left=this.left+"px",this.container.style.opacity="1";}}]),t}(),PRESET_COLOR_MAP={"light-blue":"#7cd6fd",blue:"#5e64ff",violet:"#743ee2",red:"#ff5858",orange:"#ffa00a",yellow:"#feef72",green:"#28a745","light-green":"#98d85b",purple:"#b554ff",magenta:"#ffa3ef",black:"#36114C",grey:"#bdd3e6","light-grey":"#f0f4f7","dark-grey":"#b8c2cc"},getColor=function(t){return PRESET_COLOR_MAP[t]||t},_slicedToArray=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t;}finally{try{!i&&o.return&&o.return();}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_typeof$1="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},AXIS_TICK_LENGTH=6,LABEL_MARGIN=4,LABEL_MAX_CHARS=15,FONT_SIZE=10,BASE_LINE_COLOR="#dadada",FONT_FILL="#555b51",makeOverlay={bar:function(t){var e=void 0;"rect"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var n=t.cloneNode();return n.style.fill="#000000",n.style.opacity="0.4",e&&n.setAttribute("transform",e),n},dot:function(t){var e=void 0;"circle"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var n=t.cloneNode(),i=t.getAttribute("r"),a=t.getAttribute("fill");return n.setAttribute("r",parseInt(i)+DOT_OVERLAY_SIZE_INCR),n.setAttribute("fill",a),n.style.opacity="0.6",e&&n.setAttribute("transform",e),n},heat_square:function(t){var e=void 0;"circle"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var n=t.cloneNode(),i=t.getAttribute("r"),a=t.getAttribute("fill");return n.setAttribute("r",parseInt(i)+DOT_OVERLAY_SIZE_INCR),n.setAttribute("fill",a),n.style.opacity="0.6",e&&n.setAttribute("transform",e),n}},updateOverlay={bar:function(t,e){var n=void 0;"rect"!==t.nodeName&&(n=t.getAttribute("transform"),t=t.childNodes[0]);var i=["x","y","width","height"];Object.values(t.attributes).filter(function(t){return i.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue);}),n&&e.setAttribute("transform",n);},dot:function(t,e){var n=void 0;"circle"!==t.nodeName&&(n=t.getAttribute("transform"),t=t.childNodes[0]);var i=["cx","cy"];Object.values(t.attributes).filter(function(t){return i.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue);}),n&&e.setAttribute("transform",n);},heat_square:function(t,e){var n=void 0;"circle"!==t.nodeName&&(n=t.getAttribute("transform"),t=t.childNodes[0]);var i=["cx","cy"];Object.values(t.attributes).filter(function(t){return i.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue);}),n&&e.setAttribute("transform",n);}},_slicedToArray$2=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t;}finally{try{!i&&o.return&&o.return();}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),UNIT_ANIM_DUR=350,PATH_ANIM_DUR=350,MARKER_LINE_ANIM_DUR=UNIT_ANIM_DUR,REPLACE_ALL_NEW_DUR=250,STD_EASING="easein",_slicedToArray$1=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t;}finally{try{!i&&o.return&&o.return();}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),EASING={ease:"0.25 0.1 0.25 1",linear:"0 0 1 1",easein:"0.1 0.8 0.2 1",easeout:"0 0 0.58 1",easeinout:"0.42 0 0.58 1"},CSSTEXT=".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",_createClass$2=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),BaseChart=function(){function t(e,n){if(_classCallCheck$3(this,t),this.parent="string"==typeof e?document.querySelector(e):e,!(this.parent instanceof HTMLElement))throw new Error("No `parent` element to render on was provided.");this.rawChartArgs=n,this.title=n.title||"",this.type=n.type||"",this.realData=this.prepareData(n.data),this.data=this.prepareFirstData(this.realData),this.colors=this.validateColors(n.colors,this.type),this.config={showTooltip:1,showLegend:1,isNavigable:n.isNavigable||0,animate:void 0!==n.animate?n.animate:1,truncateLegends:n.truncateLegends||1},this.measures=JSON.parse(JSON.stringify(BASE_MEASURES));var i=this.measures;this.setMeasures(n),this.title.length||(i.titleHeight=0),this.config.showLegend||(i.legendHeight=0),this.argHeight=n.height||i.baseHeight,this.state={},this.options={},this.initTimeout=INIT_CHART_UPDATE_TIMEOUT,this.config.isNavigable&&(this.overlays=[]),this.configure(n);}return _createClass$2(t,[{key:"prepareData",value:function(t){return t}},{key:"prepareFirstData",value:function(t){return t}},{key:"validateColors",value:function(t,e){var n=[];return (t=(t||[]).concat(DEFAULT_COLORS[e])).forEach(function(t){var e=getColor(t);isValidColor(e)?n.push(e):console.warn('"'+t+'" is not a valid color.');}),n}},{key:"setMeasures",value:function(){}},{key:"configure",value:function(){var t=this,e=this.argHeight;this.baseHeight=e,this.height=e-getExtraHeight(this.measures),this.boundDrawFn=function(){return t.draw(!0)},window.addEventListener("resize",this.boundDrawFn),window.addEventListener("orientationchange",this.boundDrawFn);}},{key:"destroy",value:function(){window.removeEventListener("resize",this.boundDrawFn),window.removeEventListener("orientationchange",this.boundDrawFn);}},{key:"setup",value:function(){this.makeContainer(),this.updateWidth(),this.makeTooltip(),this.draw(!1,!0);}},{key:"makeContainer",value:function(){this.parent.innerHTML="";var t={inside:this.parent,className:"chart-container"};this.independentWidth&&(t.styles={width:this.independentWidth+"px"}),this.container=$.create("div",t);}},{key:"makeTooltip",value:function(){this.tip=new SvgTip({parent:this.container,colors:this.colors}),this.bindTooltip();}},{key:"bindTooltip",value:function(){}},{key:"draw",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e&&isHidden(this.parent)||(this.updateWidth(),this.calc(e),this.makeChartArea(),this.setupComponents(),this.components.forEach(function(e){return e.setup(t.drawArea)}),this.render(this.components,!1),n&&(this.data=this.realData,setTimeout(function(){t.update(t.data);},this.initTimeout)),this.renderLegend(),this.setupNavigation(n));}},{key:"calc",value:function(){}},{key:"updateWidth",value:function(){this.baseWidth=getElementContentWidth(this.parent),this.width=this.baseWidth-getExtraWidth(this.measures);}},{key:"makeChartArea",value:function(){this.svg&&this.container.removeChild(this.svg);var t=this.measures;this.svg=makeSVGContainer(this.container,"frappe-chart chart",this.baseWidth,this.baseHeight),this.svgDefs=makeSVGDefs(this.svg),this.title.length&&(this.titleEL=makeText("title",t.margins.left,t.margins.top,this.title,{fontSize:t.titleFontSize,fill:"#666666",dy:t.titleFontSize}));var e=getTopOffset(t);this.drawArea=makeSVGGroup(this.type+"-chart chart-draw-area","translate("+getLeftOffset(t)+", "+e+")"),this.config.showLegend&&(e+=this.height+t.paddings.bottom,this.legendArea=makeSVGGroup("chart-legend","translate("+getLeftOffset(t)+", "+e+")")),this.title.length&&this.svg.appendChild(this.titleEL),this.svg.appendChild(this.drawArea),this.config.showLegend&&this.svg.appendChild(this.legendArea),this.updateTipOffset(getLeftOffset(t),getTopOffset(t));}},{key:"updateTipOffset",value:function(t,e){this.tip.offset={x:t,y:e};}},{key:"setupComponents",value:function(){this.components=new Map;}},{key:"update",value:function(t){t||console.error("No data to update."),this.data=this.prepareData(t),this.calc(),this.render(this.components,this.config.animate);}},{key:"render",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.components,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.config.isNavigable&&this.overlays.map(function(t){return t.parentNode.removeChild(t)});var i=[];e.forEach(function(t){i=i.concat(t.update(n));}),i.length>0?(runSMILAnimation(this.container,this.svg,i),setTimeout(function(){e.forEach(function(t){return t.make()}),t.updateNav();},CHART_POST_ANIMATE_TIMEOUT)):(e.forEach(function(t){return t.make()}),this.updateNav());}},{key:"updateNav",value:function(){this.config.isNavigable&&(this.makeOverlay(),this.bindUnits());}},{key:"renderLegend",value:function(){}},{key:"setupNavigation",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.config.isNavigable&&e&&(this.bindOverlay(),this.keyActions={13:this.onEnterKey.bind(this),37:this.onLeftArrow.bind(this),38:this.onUpArrow.bind(this),39:this.onRightArrow.bind(this),40:this.onDownArrow.bind(this)},document.addEventListener("keydown",function(e){isElementInViewport(t.container)&&(e=e||window.event,t.keyActions[e.keyCode]&&t.keyActions[e.keyCode]());}));}},{key:"makeOverlay",value:function(){}},{key:"updateOverlay",value:function(){}},{key:"bindOverlay",value:function(){}},{key:"bindUnits",value:function(){}},{key:"onLeftArrow",value:function(){}},{key:"onRightArrow",value:function(){}},{key:"onUpArrow",value:function(){}},{key:"onDownArrow",value:function(){}},{key:"onEnterKey",value:function(){}},{key:"addDataPoint",value:function(){}},{key:"removeDataPoint",value:function(){}},{key:"getDataPoint",value:function(){}},{key:"setCurrentDataPoint",value:function(){}},{key:"updateDataset",value:function(){}},{key:"export",value:function(){var t=prepareForExport(this.svg);downloadFile(this.title||"Chart",[t]);}}]),t}(),_createClass$1=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$1=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var s=a.get;if(void 0!==s)return s.call(i)},AggregationChart=function(t){function e(t,n){return _classCallCheck$2(this,e),_possibleConstructorReturn$1(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return _inherits$1(e,t),_createClass$1(e,[{key:"configure",value:function(t){_get$1(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),this.config.maxSlices=t.maxSlices||20,this.config.maxLegendPoints=t.maxLegendPoints||20;}},{key:"calc",value:function(){var t=this,e=this.state,n=this.config.maxSlices;e.sliceTotals=[];var i=this.data.labels.map(function(e,n){var i=0;return t.data.datasets.map(function(t){i+=t.values[n];}),[i,e]}).filter(function(t){return t[0]>=0}),a=i;if(i.length>n){i.sort(function(t,e){return e[0]-t[0]}),a=i.slice(0,n-1);var r=0;i.slice(n-1).map(function(t){r+=t[0];}),a.push([r,"Rest"]),this.colors[n-1]="grey";}e.labels=[],a.map(function(t){e.sliceTotals.push(t[0]),e.labels.push(t[1]);}),e.grandTotal=e.sliceTotals.reduce(function(t,e){return t+e},0),this.center={x:this.width/2,y:this.height/2};}},{key:"renderLegend",value:function(){var t=this,e=this.state;this.legendArea.textContent="",this.legendTotals=e.sliceTotals.slice(0,this.config.maxLegendPoints);var n=0,i=0;this.legendTotals.map(function(a,r){var s=150,o=Math.floor((t.width-getExtraWidth(t.measures))/s);t.legendTotals.length<o&&(s=t.width/t.legendTotals.length),n>o&&(n=0,i+=20);var l=s*n+5,u=t.config.truncateLegends?truncateString(e.labels[r],s/10):e.labels[r],c=legendDot(l,i,5,t.colors[r],u+": "+a,!1);t.legendArea.appendChild(c),n++;});}}]),e}(BaseChart),NO_OF_YEAR_MONTHS=12,NO_OF_DAYS_IN_WEEK=7,NO_OF_MILLIS=1e3,SEC_IN_DAY=86400,MONTH_NAMES=["January","February","March","April","May","June","July","August","September","October","November","December"],DAY_NAMES_SHORT=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],_slicedToArray$3=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t;}finally{try{!i&&o.return&&o.return();}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass$4=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),ChartComponent=function(){function t(e){var n=e.layerClass,i=void 0===n?"":n,a=e.layerTransform,r=void 0===a?"":a,s=e.constants,o=e.getData,l=e.makeElements,u=e.animateElements;_classCallCheck$5(this,t),this.layerTransform=r,this.constants=s,this.makeElements=l,this.getData=o,this.animateElements=u,this.store=[],this.labels=[],this.layerClass=i,this.layerClass="function"==typeof this.layerClass?this.layerClass():this.layerClass,this.refresh();}return _createClass$4(t,[{key:"refresh",value:function(t){this.data=t||this.getData();}},{key:"setup",value:function(t){this.layer=makeSVGGroup(this.layerClass,this.layerTransform,t);}},{key:"make",value:function(){this.render(this.data),this.oldData=this.data;}},{key:"render",value:function(t){var e=this;this.store=this.makeElements(t),this.layer.textContent="",this.store.forEach(function(t){e.layer.appendChild(t);}),this.labels.forEach(function(t){e.layer.appendChild(t);});}},{key:"update",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.refresh();var e=[];return t&&(e=this.animateElements(this.data)||[]),e}}]),t}(),componentConfigs={donutSlices:{layerClass:"donut-slices",makeElements:function(t){return t.sliceStrings.map(function(e,n){var i=makePath(e,"donut-path",t.colors[n],"none",t.strokeWidth);return i.style.transition="transform .3s;",i})},animateElements:function(t){return this.store.map(function(e,n){return animatePathStr(e,t.sliceStrings[n])})}},pieSlices:{layerClass:"pie-slices",makeElements:function(t){return t.sliceStrings.map(function(e,n){var i=makePath(e,"pie-path","none",t.colors[n]);return i.style.transition="transform .3s;",i})},animateElements:function(t){return this.store.map(function(e,n){return animatePathStr(e,t.sliceStrings[n])})}},percentageBars:{layerClass:"percentage-bars",makeElements:function(t){var e=this;return t.xPositions.map(function(n,i){return percentageBar(n,0,t.widths[i],e.constants.barHeight,e.constants.barDepth,t.colors[i])})},animateElements:function(t){if(t)return []}},yAxis:{layerClass:"y axis",makeElements:function(t){var e=this;return t.positions.map(function(n,i){return yLine(n,t.labels[i],e.constants.width,{mode:e.constants.mode,pos:e.constants.pos,shortenNumbers:e.constants.shortenNumbers})})},animateElements:function(t){var e=t.positions,n=t.labels,i=this.oldData.positions,a=this.oldData.labels,r=equilizeNoOfElements(i,e),s=_slicedToArray$3(r,2);i=s[0],e=s[1];var o=equilizeNoOfElements(a,n),l=_slicedToArray$3(o,2);return a=l[0],n=l[1],this.render({positions:i,labels:n}),this.store.map(function(t,n){return translateHoriLine(t,e[n],i[n])})}},xAxis:{layerClass:"x axis",makeElements:function(t){var e=this;return t.positions.map(function(n,i){return xLine(n,t.calcLabels[i],e.constants.height,{mode:e.constants.mode,pos:e.constants.pos})})},animateElements:function(t){var e=t.positions,n=t.calcLabels,i=this.oldData.positions,a=this.oldData.calcLabels,r=equilizeNoOfElements(i,e),s=_slicedToArray$3(r,2);i=s[0],e=s[1];var o=equilizeNoOfElements(a,n),l=_slicedToArray$3(o,2);return a=l[0],n=l[1],this.render({positions:i,calcLabels:n}),this.store.map(function(t,n){return translateVertLine(t,e[n],i[n])})}},yMarkers:{layerClass:"y-markers",makeElements:function(t){var e=this;return t.map(function(t){return yMarker(t.position,t.label,e.constants.width,{labelPos:t.options.labelPos,mode:"span",lineType:"dashed"})})},animateElements:function(t){var e=equilizeNoOfElements(this.oldData,t),n=_slicedToArray$3(e,2);this.oldData=n[0];var i=(t=n[1]).map(function(t){return t.position}),a=t.map(function(t){return t.label}),r=t.map(function(t){return t.options}),s=this.oldData.map(function(t){return t.position});return this.render(s.map(function(t,e){return {position:s[e],label:a[e],options:r[e]}})),this.store.map(function(t,e){return translateHoriLine(t,i[e],s[e])})}},yRegions:{layerClass:"y-regions",makeElements:function(t){var e=this;return t.map(function(t){return yRegion(t.startPos,t.endPos,e.constants.width,t.label,{labelPos:t.options.labelPos})})},animateElements:function(t){var e=equilizeNoOfElements(this.oldData,t),n=_slicedToArray$3(e,2);this.oldData=n[0];var i=(t=n[1]).map(function(t){return t.endPos}),a=t.map(function(t){return t.label}),r=t.map(function(t){return t.startPos}),s=t.map(function(t){return t.options}),o=this.oldData.map(function(t){return t.endPos}),l=this.oldData.map(function(t){return t.startPos});this.render(o.map(function(t,e){return {startPos:l[e],endPos:o[e],label:a[e],options:s[e]}}));var u=[];return this.store.map(function(t,e){u=u.concat(animateRegion(t,r[e],i[e],o[e]));}),u}},heatDomain:{layerClass:function(){return "heat-domain domain-"+this.constants.index},makeElements:function(t){var e=this,n=this.constants,i=n.index,a=n.colWidth,r=n.rowHeight,s=n.squareSize,o=n.radius,l=n.xTranslate,u=0;return this.serializedSubDomains=[],t.cols.map(function(t,n){1===n&&e.labels.push(makeText("domain-name",l,-12,getMonthName(i,!0).toUpperCase(),{fontSize:9})),t.map(function(t,n){if(t.fill){var i={"data-date":t.yyyyMmDd,"data-value":t.dataValue,"data-day":n},a=heatSquare("day",l,u,s,o,t.fill,i);e.serializedSubDomains.push(a);}u+=r;}),u=0,l+=a;}),this.serializedSubDomains},animateElements:function(t){if(t)return []}},barGraph:{layerClass:function(){return "dataset-units dataset-bars dataset-"+this.constants.index},makeElements:function(t){var e=this.constants;return this.unitType="bar",this.units=t.yPositions.map(function(n,i){return datasetBar(t.xPositions[i],n,t.barWidth,e.color,t.labels[i],i,t.offsets[i],{zeroLine:t.zeroLine,barsWidth:t.barsWidth,minHeight:e.minHeight})}),this.units},animateElements:function(t){var e=t.xPositions,n=t.yPositions,i=t.offsets,a=t.labels,r=this.oldData.xPositions,s=this.oldData.yPositions,o=this.oldData.offsets,l=this.oldData.labels,u=equilizeNoOfElements(r,e),c=_slicedToArray$3(u,2);r=c[0],e=c[1];var h=equilizeNoOfElements(s,n),d=_slicedToArray$3(h,2);s=d[0],n=d[1];var f=equilizeNoOfElements(o,i),p=_slicedToArray$3(f,2);o=p[0],i=p[1];var v=equilizeNoOfElements(l,a),g=_slicedToArray$3(v,2);l=g[0],a=g[1],this.render({xPositions:r,yPositions:s,offsets:o,labels:a,zeroLine:this.oldData.zeroLine,barsWidth:this.oldData.barsWidth,barWidth:this.oldData.barWidth});var y=[];return this.store.map(function(a,r){y=y.concat(animateBar(a,e[r],n[r],t.barWidth,i[r],{zeroLine:t.zeroLine}));}),y}},lineGraph:{layerClass:function(){return "dataset-units dataset-line dataset-"+this.constants.index},makeElements:function(t){var e=this.constants;return this.unitType="dot",this.paths={},e.hideLine||(this.paths=getPaths(t.xPositions,t.yPositions,e.color,{heatline:e.heatline,regionFill:e.regionFill,spline:e.spline},{svgDefs:e.svgDefs,zeroLine:t.zeroLine})),this.units=[],e.hideDots||(this.units=t.yPositions.map(function(n,i){return datasetDot(t.xPositions[i],n,t.radius,e.color,e.valuesOverPoints?t.values[i]:"",i)})),Object.values(this.paths).concat(this.units)},animateElements:function(t){var e=t.xPositions,n=t.yPositions,i=t.values,a=this.oldData.xPositions,r=this.oldData.yPositions,s=this.oldData.values,o=equilizeNoOfElements(a,e),l=_slicedToArray$3(o,2);a=l[0],e=l[1];var u=equilizeNoOfElements(r,n),c=_slicedToArray$3(u,2);r=c[0],n=c[1];var h=equilizeNoOfElements(s,i),d=_slicedToArray$3(h,2);s=d[0],i=d[1],this.render({xPositions:a,yPositions:r,values:i,zeroLine:this.oldData.zeroLine,radius:this.oldData.radius});var f=[];return Object.keys(this.paths).length&&(f=f.concat(animatePath(this.paths,e,n,t.zeroLine,this.constants.spline))),this.units.length&&this.units.map(function(t,i){f=f.concat(animateDot(t,e[i],n[i]));}),f}}},_createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var s=a.get;if(void 0!==s)return s.call(i)},PercentageChart=function(t){function e(t,n){_classCallCheck$1(this,e);var i=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.type="percentage",i.setup(),i}return _inherits(e,t),_createClass(e,[{key:"setMeasures",value:function(t){var e=this.measures;this.barOptions=t.barOptions||{};var n=this.barOptions;n.height=n.height||PERCENTAGE_BAR_DEFAULT_HEIGHT,n.depth=n.depth||PERCENTAGE_BAR_DEFAULT_DEPTH,e.paddings.right=30,e.legendHeight=60,e.baseHeight=8*(n.height+.5*n.depth);}},{key:"setupComponents",value:function(){var t=this.state,e=[["percentageBars",{barHeight:this.barOptions.height,barDepth:this.barOptions.depth},function(){return {xPositions:t.xPositions,widths:t.widths,colors:this.colors}}.bind(this)]];this.components=new Map(e.map(function(t){var e=getComponent.apply(void 0,_toConsumableArray(t));return [t[0],e]}));}},{key:"calc",value:function(){var t=this;_get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"calc",this).call(this);var n=this.state;n.xPositions=[],n.widths=[];var i=0;n.sliceTotals.map(function(e){var a=t.width*e/n.grandTotal;n.widths.push(a),n.xPositions.push(i),i+=a;});}},{key:"makeDataByIndex",value:function(){}},{key:"bindTooltip",value:function(){var t=this,e=this.state;this.container.addEventListener("mousemove",function(n){var i=t.components.get("percentageBars").store,a=n.target;if(i.includes(a)){var r=i.indexOf(a),s=getOffset(t.container),o=getOffset(a),l=o.left-s.left+parseInt(a.getAttribute("width"))/2,u=o.top-s.top,c=(t.formattedLabels&&t.formattedLabels.length>0?t.formattedLabels[r]:t.state.labels[r])+": ",h=e.sliceTotals[r]/e.grandTotal;t.tip.setValues(l,u,{name:c,value:(100*h).toFixed(1)+"%"}),t.tip.showTip();}});}}]),e}(AggregationChart),_createClass$5=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$2=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var s=a.get;if(void 0!==s)return s.call(i)},PieChart=function(t){function e(t,n){_classCallCheck$6(this,e);var i=_possibleConstructorReturn$2(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.type="pie",i.initTimeout=0,i.init=1,i.setup(),i}return _inherits$2(e,t),_createClass$5(e,[{key:"configure",value:function(t){_get$2(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=t.hoverRadio||.1,this.config.startAngle=t.startAngle||0,this.clockWise=t.clockWise||!1;}},{key:"calc",value:function(){var t=this;_get$2(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"calc",this).call(this);var n=this.state;this.radius=this.height>this.width?this.center.x:this.center.y;var i=this.radius,a=this.clockWise,r=n.slicesProperties||[];n.sliceStrings=[],n.slicesProperties=[];var s=180-this.config.startAngle;n.sliceTotals.map(function(e,o){var l=s,u=e/n.grandTotal*FULL_ANGLE,c=u>180?1:0,h=a?-u:u,d=s+=h,f=getPositionByAngle(l,i),p=getPositionByAngle(d,i),v=t.init&&r[o],g=void 0,y=void 0;t.init?(g=v?v.startPosition:f,y=v?v.endPosition:f):(g=f,y=p);var m=360===u?makeCircleStr(g,y,t.center,t.radius,a,c):makeArcPathStr(g,y,t.center,t.radius,a,c);n.sliceStrings.push(m),n.slicesProperties.push({startPosition:f,endPosition:p,value:e,total:n.grandTotal,startAngle:l,endAngle:d,angle:h});}),this.init=0;}},{key:"setupComponents",value:function(){var t=this.state,e=[["pieSlices",{},function(){return {sliceStrings:t.sliceStrings,colors:this.colors}}.bind(this)]];this.components=new Map(e.map(function(t){var e=getComponent.apply(void 0,_toConsumableArray$2(t));return [t[0],e]}));}},{key:"calTranslateByAngle",value:function(t){var e=this.radius,n=this.hoverRadio,i=getPositionByAngle(t.startAngle+t.angle/2,e);return "translate3d("+i.x*n+"px,"+i.y*n+"px,0)"}},{key:"hoverSlice",value:function(t,e,n,i){if(t){var a=this.colors[e];if(n){transform(t,this.calTranslateByAngle(this.state.slicesProperties[e])),t.style.fill=lightenDarkenColor(a,50);var r=getOffset(this.svg),s=i.pageX-r.left+10,o=i.pageY-r.top-10,l=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[e]:this.state.labels[e])+": ",u=(100*this.state.sliceTotals[e]/this.state.grandTotal).toFixed(1);this.tip.setValues(s,o,{name:l,value:u+"%"}),this.tip.showTip();}else transform(t,"translate3d(0,0,0)"),this.tip.hideTip(),t.style.fill=a;}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave);}},{key:"mouseMove",value:function(t){var e=t.target,n=this.components.get("pieSlices").store,i=this.curActiveSliceIndex,a=this.curActiveSlice;if(n.includes(e)){var r=n.indexOf(e);this.hoverSlice(a,i,!1),this.curActiveSlice=e,this.curActiveSliceIndex=r,this.hoverSlice(e,r,!0,t);}else this.mouseLeave();}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1);}}]),e}(AggregationChart),_slicedToArray$4=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t;}finally{try{!i&&o.return&&o.return();}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass$6=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),COL_WIDTH=HEATMAP_SQUARE_SIZE+HEATMAP_GUTTER_SIZE,ROW_HEIGHT=COL_WIDTH,Heatmap=function(t){function e(t,n){_classCallCheck$7(this,e);var i=_possibleConstructorReturn$3(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.type="heatmap",i.countLabel=n.countLabel||"";var a=["Sunday","Monday"],r=a.includes(n.startSubDomain)?n.startSubDomain:"Sunday";return i.startSubDomainIndex=a.indexOf(r),i.setup(),i}return _inherits$3(e,t),_createClass$6(e,[{key:"setMeasures",value:function(t){var e=this.measures;this.discreteDomains=0===t.discreteDomains?0:1,e.paddings.top=3*ROW_HEIGHT,e.paddings.bottom=0,e.legendHeight=2*ROW_HEIGHT,e.baseHeight=ROW_HEIGHT*NO_OF_DAYS_IN_WEEK+getExtraHeight(e);var n=this.data,i=this.discreteDomains?NO_OF_YEAR_MONTHS:0;this.independentWidth=(getWeeksBetween(n.start,n.end)+i)*COL_WIDTH+getExtraWidth(e);}},{key:"updateWidth",value:function(){var t=this.discreteDomains?NO_OF_YEAR_MONTHS:0,e=this.state.noOfWeeks?this.state.noOfWeeks:52;this.baseWidth=(e+t)*COL_WIDTH+getExtraWidth(this.measures);}},{key:"prepareData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data;if(t.start&&t.end&&t.start>t.end)throw new Error("Start date cannot be greater than end date.");if(t.start||(t.start=new Date,t.start.setFullYear(t.start.getFullYear()-1)),t.end||(t.end=new Date),t.dataPoints=t.dataPoints||{},parseInt(Object.keys(t.dataPoints)[0])>1e5){var e={};Object.keys(t.dataPoints).forEach(function(n){var i=new Date(n*NO_OF_MILLIS);e[getYyyyMmDd(i)]=t.dataPoints[n];}),t.dataPoints=e;}return t}},{key:"calc",value:function(){var t=this.state;t.start=clone(this.data.start),t.end=clone(this.data.end),t.firstWeekStart=clone(t.start),t.noOfWeeks=getWeeksBetween(t.start,t.end),t.distribution=calcDistribution(Object.values(this.data.dataPoints),HEATMAP_DISTRIBUTION_SIZE),t.domainConfigs=this.getDomains();}},{key:"setupComponents",value:function(){var t=this,e=this.state,n=this.discreteDomains?0:1,i=e.domainConfigs.map(function(i,a){return ["heatDomain",{index:i.index,colWidth:COL_WIDTH,rowHeight:ROW_HEIGHT,squareSize:HEATMAP_SQUARE_SIZE,radius:t.rawChartArgs.radius||0,xTranslate:e.domainConfigs.filter(function(t,e){return e<a}).map(function(t){return t.cols.length-n}).reduce(function(t,e){return t+e},0)*COL_WIDTH},function(){return e.domainConfigs[a]}.bind(t)]});this.components=new Map(i.map(function(t,e){var n=getComponent.apply(void 0,_toConsumableArray$3(t));return [t[0]+"-"+e,n]}));var a=0;DAY_NAMES_SHORT.forEach(function(e,n){if([1,3,5].includes(n)){var i=makeText("subdomain-name",-COL_WIDTH/2,a,e,{fontSize:HEATMAP_SQUARE_SIZE,dy:8,textAnchor:"end"});t.drawArea.appendChild(i);}a+=ROW_HEIGHT;});}},{key:"update",value:function(t){t||console.error("No data to update."),this.data=this.prepareData(t),this.draw(),this.bindTooltip();}},{key:"bindTooltip",value:function(){var t=this;this.container.addEventListener("mousemove",function(e){t.components.forEach(function(n){var i=n.store,a=e.target;if(i.includes(a)){var r=a.getAttribute("data-value"),s=a.getAttribute("data-date").split("-"),o=getMonthName(parseInt(s[1])-1,!0),l=t.container.getBoundingClientRect(),u=a.getBoundingClientRect(),c=parseInt(e.target.getAttribute("width")),h=u.left-l.left+c/2,d=u.top-l.top,f=r+" "+t.countLabel,p=" on "+o+" "+s[0]+", "+s[2];t.tip.setValues(h,d,{name:p,value:f,valueFirst:1},[]),t.tip.showTip();}});});}},{key:"renderLegend",value:function(){var t=this;this.legendArea.textContent="";var e=0,n=ROW_HEIGHT,i=this.rawChartArgs.radius||0,a=makeText("subdomain-name",e,n,"Less",{fontSize:HEATMAP_SQUARE_SIZE+1,dy:9});e=2*COL_WIDTH+COL_WIDTH/2,this.legendArea.appendChild(a),this.colors.slice(0,HEATMAP_DISTRIBUTION_SIZE).map(function(a,r){var s=heatSquare("heatmap-legend-unit",e+(COL_WIDTH+3)*r,n,HEATMAP_SQUARE_SIZE,i,a);t.legendArea.appendChild(s);});var r=makeText("subdomain-name",e+HEATMAP_DISTRIBUTION_SIZE*(COL_WIDTH+3)+COL_WIDTH/4,n,"More",{fontSize:HEATMAP_SQUARE_SIZE+1,dy:9});this.legendArea.appendChild(r);}},{key:"getDomains",value:function(){for(var t=this.state,e=[t.start.getMonth(),t.start.getFullYear()],n=e[0],i=e[1],a=[t.end.getMonth(),t.end.getFullYear()],r=a[0]-n+1+12*(a[1]-i),s=[],o=clone(t.start),l=0;l<r;l++){var u=t.end;if(!areInSameMonth(o,t.end)){var c=[o.getMonth(),o.getFullYear()];u=getLastDateInMonth(c[0],c[1]);}s.push(this.getDomainConfig(o,u)),addDays(u,1),o=u;}return s}},{key:"getDomainConfig",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=[t.getMonth(),t.getFullYear()],i=n[0],a=n[1],r=setDayToSunday(t),s={index:i,cols:[]};addDays(e=clone(e)||getLastDateInMonth(i,a),1);for(var o=getWeeksBetween(r,e),l=[],u=void 0,c=0;c<o;c++)u=this.getCol(r,i),l.push(u),addDays(r=new Date(u[NO_OF_DAYS_IN_WEEK-1].yyyyMmDd),1);return void 0!==u[NO_OF_DAYS_IN_WEEK-1].dataValue&&(addDays(r,1),l.push(this.getCol(r,i,!0))),s.cols=l,s}},{key:"getCol",value:function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.state,a=clone(t),r=[],s=0;s<NO_OF_DAYS_IN_WEEK;s++,addDays(a,1)){var o={},l=a>=i.start&&a<=i.end;n||a.getMonth()!==e||!l?o.yyyyMmDd=getYyyyMmDd(a):o=this.getSubDomainConfig(a),r.push(o);}return r}},{key:"getSubDomainConfig",value:function(t){var e=getYyyyMmDd(t),n=this.data.dataPoints[e];return {yyyyMmDd:e,dataValue:n||0,fill:this.colors[getMaxCheckpoint(n,this.state.distribution)]}}}]),e}(BaseChart),_createClass$7=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$3=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var s=a.get;if(void 0!==s)return s.call(i)},AxisChart=function(t){function e(t,n){_classCallCheck$8(this,e);var i=_possibleConstructorReturn$4(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.barOptions=n.barOptions||{},i.lineOptions=n.lineOptions||{},i.type=n.type||"line",i.init=1,i.setup(),i}return _inherits$4(e,t),_createClass$7(e,[{key:"setMeasures",value:function(){this.data.datasets.length<=1&&(this.config.showLegend=0,this.measures.paddings.bottom=30);}},{key:"configure",value:function(t){_get$3(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),t.axisOptions=t.axisOptions||{},t.tooltipOptions=t.tooltipOptions||{},this.config.xAxisMode=t.axisOptions.xAxisMode||"span",this.config.yAxisMode=t.axisOptions.yAxisMode||"span",this.config.xIsSeries=t.axisOptions.xIsSeries||0,this.config.shortenYAxisNumbers=t.axisOptions.shortenYAxisNumbers||0,this.config.formatTooltipX=t.tooltipOptions.formatTooltipX,this.config.formatTooltipY=t.tooltipOptions.formatTooltipY,this.config.valuesOverPoints=t.valuesOverPoints;}},{key:"prepareData",value:function(){return dataPrep(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data,this.type)}},{key:"prepareFirstData",value:function(){return zeroDataPrep(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data)}},{key:"calc",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.calcXPositions(),t||this.calcYAxisParameters(this.getAllYValues(),"line"===this.type),this.makeDataByIndex();}},{key:"calcXPositions",value:function(){var t=this.state,e=this.data.labels;t.datasetLength=e.length,t.unitWidth=this.width/t.datasetLength,t.xOffset=t.unitWidth/2,t.xAxis={labels:e,positions:e.map(function(e,n){return floatTwo(t.xOffset+n*t.unitWidth)})};}},{key:"calcYAxisParameters",value:function(t){var e=calcChartIntervals(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"false"),n=this.height/getValueRange(e),i=getIntervalSize(e)*n,a=this.height-getZeroIndex(e)*i;this.state.yAxis={labels:e,positions:e.map(function(t){return a-t*n}),scaleMultiplier:n,zeroLine:a},this.calcDatasetPoints(),this.calcYExtremes(),this.calcYRegions();}},{key:"calcDatasetPoints",value:function(){var t=this.state,e=function(e){return e.map(function(e){return scale(e,t.yAxis)})};t.datasets=this.data.datasets.map(function(t,n){var i=t.values,a=t.cumulativeYs||[];return {name:t.name,index:n,chartType:t.chartType,values:i,yPositions:e(i),cumulativeYs:a,cumulativeYPos:e(a)}});}},{key:"calcYExtremes",value:function(){var t=this.state;if(this.barOptions.stacked)return void(t.yExtremes=t.datasets[t.datasets.length-1].cumulativeYPos);t.yExtremes=new Array(t.datasetLength).fill(9999),t.datasets.map(function(e){e.yPositions.map(function(e,n){e<t.yExtremes[n]&&(t.yExtremes[n]=e);});});}},{key:"calcYRegions",value:function(){var t=this.state;this.data.yMarkers&&(this.state.yMarkers=this.data.yMarkers.map(function(e){return e.position=scale(e.value,t.yAxis),e.options||(e.options={}),e})),this.data.yRegions&&(this.state.yRegions=this.data.yRegions.map(function(e){return e.startPos=scale(e.start,t.yAxis),e.endPos=scale(e.end,t.yAxis),e.options||(e.options={}),e}));}},{key:"getAllYValues",value:function(){var t,e=this,n="values";if(this.barOptions.stacked){n="cumulativeYs";var i=new Array(this.state.datasetLength).fill(0);this.data.datasets.map(function(t,a){var r=e.data.datasets[a].values;t[n]=i=i.map(function(t,e){return t+r[e]});});}var a=this.data.datasets.map(function(t){return t[n]});return this.data.yMarkers&&a.push(this.data.yMarkers.map(function(t){return t.value})),this.data.yRegions&&this.data.yRegions.map(function(t){a.push([t.end,t.start]);}),(t=[]).concat.apply(t,_toConsumableArray$5(a))}},{key:"setupComponents",value:function(){var t=this,e=[["yAxis",{mode:this.config.yAxisMode,width:this.width,shortenNumbers:this.config.shortenYAxisNumbers},function(){return this.state.yAxis}.bind(this)],["xAxis",{mode:this.config.xAxisMode,height:this.height},function(){var t=this.state;return t.xAxis.calcLabels=getShortenedLabels(this.width,t.xAxis.labels,this.config.xIsSeries),t.xAxis}.bind(this)],["yRegions",{width:this.width,pos:"right"},function(){return this.state.yRegions}.bind(this)]],n=this.state.datasets.filter(function(t){return "bar"===t.chartType}),i=this.state.datasets.filter(function(t){return "line"===t.chartType}),a=n.map(function(e){var i=e.index;return ["barGraph-"+e.index,{index:i,color:t.colors[i],stacked:t.barOptions.stacked,valuesOverPoints:t.config.valuesOverPoints,minHeight:t.height*MIN_BAR_PERCENT_HEIGHT},function(){var t=this.state,e=t.datasets[i],a=this.barOptions.stacked,r=this.barOptions.spaceRatio||BAR_CHART_SPACE_RATIO,s=t.unitWidth*(1-r),o=s/(a?1:n.length),l=t.xAxis.positions.map(function(t){return t-s/2});a||(l=l.map(function(t){return t+o*i}));var u=new Array(t.datasetLength).fill("");this.config.valuesOverPoints&&(u=a&&e.index===t.datasets.length-1?e.cumulativeYs:e.values);var c=new Array(t.datasetLength).fill(0);return a&&(c=e.yPositions.map(function(t,n){return t-e.cumulativeYPos[n]})),{xPositions:l,yPositions:e.yPositions,offsets:c,labels:u,zeroLine:t.yAxis.zeroLine,barsWidth:s,barWidth:o}}.bind(t)]}),r=i.map(function(e){var n=e.index;return ["lineGraph-"+e.index,{index:n,color:t.colors[n],svgDefs:t.svgDefs,heatline:t.lineOptions.heatline,regionFill:t.lineOptions.regionFill,spline:t.lineOptions.spline,hideDots:t.lineOptions.hideDots,hideLine:t.lineOptions.hideLine,valuesOverPoints:t.config.valuesOverPoints},function(){var t=this.state,e=t.datasets[n],i=t.yAxis.positions[0]<t.yAxis.zeroLine?t.yAxis.positions[0]:t.yAxis.zeroLine;return {xPositions:t.xAxis.positions,yPositions:e.yPositions,values:e.values,zeroLine:i,radius:this.lineOptions.dotSize||LINE_CHART_DOT_SIZE}}.bind(t)]}),s=[["yMarkers",{width:this.width,pos:"right"},function(){return this.state.yMarkers}.bind(this)]];e=e.concat(a,r,s);var o=["yMarkers","yRegions"];this.dataUnitComponents=[],this.components=new Map(e.filter(function(e){return !o.includes(e[0])||t.state[e[0]]}).map(function(e){var n=getComponent.apply(void 0,_toConsumableArray$5(e));return (e[0].includes("lineGraph")||e[0].includes("barGraph"))&&t.dataUnitComponents.push(n),[e[0],n]}));}},{key:"makeDataByIndex",value:function(){var t=this;this.dataByIndex={};var e=this.state,n=this.config.formatTooltipX,i=this.config.formatTooltipY;e.xAxis.labels.map(function(a,r){var s=t.state.datasets.map(function(e,n){var a=e.values[r];return {title:e.name,value:a,yPos:e.yPositions[r],color:t.colors[n],formatted:i?i(a):a}});t.dataByIndex[r]={label:a,formattedLabel:n?n(a):a,xPos:e.xAxis.positions[r],values:s,yExtreme:e.yExtremes[r]};});}},{key:"bindTooltip",value:function(){var t=this;this.container.addEventListener("mousemove",function(e){var n=t.measures,i=getOffset(t.container),a=e.pageX-i.left-getLeftOffset(n),r=e.pageY-i.top;r<t.height+getTopOffset(n)&&r>getTopOffset(n)?t.mapTooltipXPosition(a):t.tip.hideTip();});}},{key:"mapTooltipXPosition",value:function(t){var e=this.state;if(e.yExtremes){var n=getClosestInArray(t,e.xAxis.positions,!0);if(n>=0){var i=this.dataByIndex[n];this.tip.setValues(i.xPos+this.tip.offset.x,i.yExtreme+this.tip.offset.y,{name:i.formattedLabel,value:""},i.values,n),this.tip.showTip();}}}},{key:"renderLegend",value:function(){var t=this,e=this.data;e.datasets.length>1&&(this.legendArea.textContent="",e.datasets.map(function(e,n){var i=AXIS_LEGEND_BAR_SIZE,a=legendBar(i*n,"0",i,t.colors[n],e.name,t.config.truncateLegends);t.legendArea.appendChild(a);}));}},{key:"makeOverlay",value:function(){var t=this;if(this.init)return void(this.init=0);this.overlayGuides&&this.overlayGuides.forEach(function(t){var e=t.overlay;e.parentNode.removeChild(e);}),this.overlayGuides=this.dataUnitComponents.map(function(t){return {type:t.unitType,overlay:void 0,units:t.units}}),void 0===this.state.currentIndex&&(this.state.currentIndex=this.state.datasetLength-1),this.overlayGuides.map(function(e){var n=e.units[t.state.currentIndex];e.overlay=makeOverlay[e.type](n),t.drawArea.appendChild(e.overlay);});}},{key:"updateOverlayGuides",value:function(){this.overlayGuides&&this.overlayGuides.forEach(function(t){var e=t.overlay;e.parentNode.removeChild(e);});}},{key:"bindOverlay",value:function(){var t=this;this.parent.addEventListener("data-select",function(){t.updateOverlay();});}},{key:"bindUnits",value:function(){var t=this;this.dataUnitComponents.map(function(e){e.units.map(function(e){e.addEventListener("click",function(){var n=e.getAttribute("data-point-index");t.setCurrentDataPoint(n);});});}),this.tip.container.addEventListener("click",function(){var e=t.tip.container.getAttribute("data-point-index");t.setCurrentDataPoint(e);});}},{key:"updateOverlay",value:function(){var t=this;this.overlayGuides.map(function(e){var n=e.units[t.state.currentIndex];updateOverlay[e.type](n,e.overlay);});}},{key:"onLeftArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex-1);}},{key:"onRightArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex+1);}},{key:"getDataPoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.currentIndex,e=this.state;return {index:t,label:e.xAxis.labels[t],values:e.datasets.map(function(e){return e.values[t]})}}},{key:"setCurrentDataPoint",value:function(t){var e=this.state;(t=parseInt(t))<0&&(t=0),t>=e.xAxis.labels.length&&(t=e.xAxis.labels.length-1),t!==e.currentIndex&&(e.currentIndex=t,fire(this.parent,"data-select",this.getDataPoint()));}},{key:"addDataPoint",value:function(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.state.datasetLength;_get$3(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"addDataPoint",this).call(this,t,n,i),this.data.labels.splice(i,0,t),this.data.datasets.map(function(t,e){t.values.splice(i,0,n[e]);}),this.update(this.data);}},{key:"removeDataPoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.datasetLength-1;this.data.labels.length<=1||(_get$3(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"removeDataPoint",this).call(this,t),this.data.labels.splice(t,1),this.data.datasets.map(function(e){e.values.splice(t,1);}),this.update(this.data));}},{key:"updateDataset",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.data.datasets[e].values=t,this.update(this.data);}},{key:"updateDatasets",value:function(t){this.data.datasets.map(function(e,n){t[n]&&(e.values=t[n]);}),this.update(this.data);}}]),e}(BaseChart),_createClass$8=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$4=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var s=a.get;if(void 0!==s)return s.call(i)},DonutChart=function(t){function e(t,n){_classCallCheck$9(this,e);var i=_possibleConstructorReturn$5(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.type="donut",i.initTimeout=0,i.init=1,i.setup(),i}return _inherits$5(e,t),_createClass$8(e,[{key:"configure",value:function(t){_get$4(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=t.hoverRadio||.1,this.config.startAngle=t.startAngle||0,this.clockWise=t.clockWise||!1,this.strokeWidth=t.strokeWidth||30;}},{key:"calc",value:function(){var t=this;_get$4(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"calc",this).call(this);var n=this.state;this.radius=this.height>this.width?this.center.x-this.strokeWidth/2:this.center.y-this.strokeWidth/2;var i=this.radius,a=this.clockWise,r=n.slicesProperties||[];n.sliceStrings=[],n.slicesProperties=[];var s=180-this.config.startAngle;n.sliceTotals.map(function(e,o){var l=s,u=e/n.grandTotal*FULL_ANGLE,c=u>180?1:0,h=a?-u:u,d=s+=h,f=getPositionByAngle(l,i),p=getPositionByAngle(d,i),v=t.init&&r[o],g=void 0,y=void 0;t.init?(g=v?v.startPosition:f,y=v?v.endPosition:f):(g=f,y=p);var m=360===u?makeStrokeCircleStr(g,y,t.center,t.radius,t.clockWise,c):makeArcStrokePathStr(g,y,t.center,t.radius,t.clockWise,c);n.sliceStrings.push(m),n.slicesProperties.push({startPosition:f,endPosition:p,value:e,total:n.grandTotal,startAngle:l,endAngle:d,angle:h});}),this.init=0;}},{key:"setupComponents",value:function(){var t=this.state,e=[["donutSlices",{},function(){return {sliceStrings:t.sliceStrings,colors:this.colors,strokeWidth:this.strokeWidth}}.bind(this)]];this.components=new Map(e.map(function(t){var e=getComponent.apply(void 0,_toConsumableArray$7(t));return [t[0],e]}));}},{key:"calTranslateByAngle",value:function(t){var e=this.radius,n=this.hoverRadio,i=getPositionByAngle(t.startAngle+t.angle/2,e);return "translate3d("+i.x*n+"px,"+i.y*n+"px,0)"}},{key:"hoverSlice",value:function(t,e,n,i){if(t){var a=this.colors[e];if(n){transform(t,this.calTranslateByAngle(this.state.slicesProperties[e])),t.style.stroke=lightenDarkenColor(a,50);var r=getOffset(this.svg),s=i.pageX-r.left+10,o=i.pageY-r.top-10,l=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[e]:this.state.labels[e])+": ",u=(100*this.state.sliceTotals[e]/this.state.grandTotal).toFixed(1);this.tip.setValues(s,o,{name:l,value:u+"%"}),this.tip.showTip();}else transform(t,"translate3d(0,0,0)"),this.tip.hideTip(),t.style.stroke=a;}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave);}},{key:"mouseMove",value:function(t){var e=t.target,n=this.components.get("donutSlices").store,i=this.curActiveSliceIndex,a=this.curActiveSlice;if(n.includes(e)){var r=n.indexOf(e);this.hoverSlice(a,i,!1),this.curActiveSlice=e,this.curActiveSliceIndex=r,this.hoverSlice(e,r,!0,t);}else this.mouseLeave();}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1);}}]),e}(AggregationChart),chartTypes={bar:AxisChart,line:AxisChart,percentage:PercentageChart,heatmap:Heatmap,pie:PieChart,donut:DonutChart},Chart=function t(e,n){return _classCallCheck(this,t),getChartByType(n.type,e,n)};exports.Chart=Chart,exports.PercentageChart=PercentageChart,exports.PieChart=PieChart,exports.Heatmap=Heatmap,exports.AxisChart=AxisChart;

    });

    /* home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/svelte-frappe-charts/src/components/base.svelte generated by Svelte v3.24.1 */
    const file$g = "home/cbiale/Escritorio/especializacion/dapIOT_tp_final/node_modules/svelte-frappe-charts/src/components/base.svelte";

    function create_fragment$j(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			add_location(div, file$g, 84, 0, 1983);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[15](div);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[15](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { data = {
    		labels: [],
    		datasets: [{ values: [] }],
    		yMarkers: {},
    		yRegions: []
    	} } = $$props;

    	let { type = "line" } = $$props;
    	let { height = 300 } = $$props;
    	let { axisOptions = {} } = $$props;
    	let { barOptions = {} } = $$props;
    	let { lineOptions = {} } = $$props;
    	let { tooltipOptions = {} } = $$props;
    	let { colors = [] } = $$props;
    	let { valuesOverPoints = 0 } = $$props;
    	let { isNavigable = false } = $$props;
    	let { maxSlices = 3 } = $$props;

    	/**
     *  COMPONENT
     */
    	//  The Chart returned from frappe
    	let chart = null;

    	//  DOM node for frappe to latch onto
    	let chartRef;

    	//  Helper HOF for calling a fn only if chart exists
    	function ifChartThen(fn) {
    		return function ifChart(...args) {
    			if (chart) {
    				return fn(...args);
    			}
    		};
    	}

    	const addDataPoint = ifChartThen((label, valueFromEachDataset, index) => chart.addDataPoint(label, valueFromEachDataset, index));
    	const removeDataPoint = ifChartThen(index => chart.removeDataPoint(index));
    	const exportChart = ifChartThen(() => chart.export());

    	/**
     *  Handle initializing the chart when this Svelte component mounts 
     */
    	onMount(() => {
    		chart = new frappeCharts_min_cjs.Chart(chartRef,
    		{
    				data,
    				type,
    				height,
    				colors,
    				axisOptions,
    				barOptions,
    				lineOptions,
    				tooltipOptions,
    				valuesOverPoints,
    				isNavigable,
    				maxSlices
    			});
    	});

    	//  Update the chart when incoming data changes
    	afterUpdate(() => chart.update(data));

    	//  Mark Chart references for garbage collection when component is unmounted
    	onDestroy(() => {
    		chart = null;
    	});

    	const writable_props = [
    		"data",
    		"type",
    		"height",
    		"axisOptions",
    		"barOptions",
    		"lineOptions",
    		"tooltipOptions",
    		"colors",
    		"valuesOverPoints",
    		"isNavigable",
    		"maxSlices"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Base> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Base", $$slots, []);

    	function div_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			chartRef = $$value;
    			$$invalidate(0, chartRef);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("data" in $$props) $$invalidate(1, data = $$props.data);
    		if ("type" in $$props) $$invalidate(2, type = $$props.type);
    		if ("height" in $$props) $$invalidate(3, height = $$props.height);
    		if ("axisOptions" in $$props) $$invalidate(4, axisOptions = $$props.axisOptions);
    		if ("barOptions" in $$props) $$invalidate(5, barOptions = $$props.barOptions);
    		if ("lineOptions" in $$props) $$invalidate(6, lineOptions = $$props.lineOptions);
    		if ("tooltipOptions" in $$props) $$invalidate(7, tooltipOptions = $$props.tooltipOptions);
    		if ("colors" in $$props) $$invalidate(8, colors = $$props.colors);
    		if ("valuesOverPoints" in $$props) $$invalidate(9, valuesOverPoints = $$props.valuesOverPoints);
    		if ("isNavigable" in $$props) $$invalidate(10, isNavigable = $$props.isNavigable);
    		if ("maxSlices" in $$props) $$invalidate(11, maxSlices = $$props.maxSlices);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		onDestroy,
    		Chart: frappeCharts_min_cjs.Chart,
    		data,
    		type,
    		height,
    		axisOptions,
    		barOptions,
    		lineOptions,
    		tooltipOptions,
    		colors,
    		valuesOverPoints,
    		isNavigable,
    		maxSlices,
    		chart,
    		chartRef,
    		ifChartThen,
    		addDataPoint,
    		removeDataPoint,
    		exportChart
    	});

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(1, data = $$props.data);
    		if ("type" in $$props) $$invalidate(2, type = $$props.type);
    		if ("height" in $$props) $$invalidate(3, height = $$props.height);
    		if ("axisOptions" in $$props) $$invalidate(4, axisOptions = $$props.axisOptions);
    		if ("barOptions" in $$props) $$invalidate(5, barOptions = $$props.barOptions);
    		if ("lineOptions" in $$props) $$invalidate(6, lineOptions = $$props.lineOptions);
    		if ("tooltipOptions" in $$props) $$invalidate(7, tooltipOptions = $$props.tooltipOptions);
    		if ("colors" in $$props) $$invalidate(8, colors = $$props.colors);
    		if ("valuesOverPoints" in $$props) $$invalidate(9, valuesOverPoints = $$props.valuesOverPoints);
    		if ("isNavigable" in $$props) $$invalidate(10, isNavigable = $$props.isNavigable);
    		if ("maxSlices" in $$props) $$invalidate(11, maxSlices = $$props.maxSlices);
    		if ("chart" in $$props) chart = $$props.chart;
    		if ("chartRef" in $$props) $$invalidate(0, chartRef = $$props.chartRef);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		chartRef,
    		data,
    		type,
    		height,
    		axisOptions,
    		barOptions,
    		lineOptions,
    		tooltipOptions,
    		colors,
    		valuesOverPoints,
    		isNavigable,
    		maxSlices,
    		addDataPoint,
    		removeDataPoint,
    		exportChart,
    		div_binding
    	];
    }

    class Base extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
    			data: 1,
    			type: 2,
    			height: 3,
    			axisOptions: 4,
    			barOptions: 5,
    			lineOptions: 6,
    			tooltipOptions: 7,
    			colors: 8,
    			valuesOverPoints: 9,
    			isNavigable: 10,
    			maxSlices: 11,
    			addDataPoint: 12,
    			removeDataPoint: 13,
    			exportChart: 14
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Base",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get data() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get axisOptions() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set axisOptions(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get barOptions() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set barOptions(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lineOptions() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lineOptions(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltipOptions() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltipOptions(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get colors() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set colors(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valuesOverPoints() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valuesOverPoints(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isNavigable() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isNavigable(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxSlices() {
    		throw new Error("<Base>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxSlices(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get addDataPoint() {
    		return this.$$.ctx[12];
    	}

    	set addDataPoint(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get removeDataPoint() {
    		return this.$$.ctx[13];
    	}

    	set removeDataPoint(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get exportChart() {
    		return this.$$.ctx[14];
    	}

    	set exportChart(value) {
    		throw new Error("<Base>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/componentes/Dashboard.svelte generated by Svelte v3.24.1 */

    const { console: console_1$1 } = globals;
    const file$h = "src/componentes/Dashboard.svelte";

    // (80:8) <Label>
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Exportar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(80:8) <Label>",
    		ctx
    	});

    	return block;
    }

    // (79:4) <Button on:click={exportar} variant="outlined">
    function create_default_slot_4$2(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(79:4) <Button on:click={exportar} variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (84:12) <Label>
    function create_default_slot_3$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Mapa");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(84:12) <Label>",
    		ctx
    	});

    	return block;
    }

    // (83:8) <Button variant="outlined">
    function create_default_slot_2$2(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(83:8) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (89:12) <Label>
    function create_default_slot_1$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Listado");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(89:12) <Label>",
    		ctx
    	});

    	return block;
    }

    // (88:8) <Button variant="outlined">
    function create_default_slot$3(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(88:8) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let main;
    	let h2;
    	let t0;
    	let t1;
    	let t2;
    	let chart;
    	let t3;
    	let button0;
    	let t4;
    	let a0;
    	let button1;
    	let t5;
    	let a1;
    	let button2;
    	let current;
    	let chart_props = { data: /*data*/ ctx[2], type: "line" };
    	chart = new Base({ props: chart_props, $$inline: true });
    	/*chart_binding*/ ctx[4](chart);

    	button0 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*exportar*/ ctx[3]);

    	button1 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			t0 = text("Dispositivo ");
    			t1 = text(/*id*/ ctx[0]);
    			t2 = space();
    			create_component(chart.$$.fragment);
    			t3 = space();
    			create_component(button0.$$.fragment);
    			t4 = space();
    			a0 = element("a");
    			create_component(button1.$$.fragment);
    			t5 = space();
    			a1 = element("a");
    			create_component(button2.$$.fragment);
    			attr_dev(h2, "class", "svelte-f9adgw");
    			add_location(h2, file$h, 76, 4, 2014);
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$h, 81, 4, 2198);
    			attr_dev(a1, "href", "/dispositivos");
    			add_location(a1, file$h, 86, 4, 2310);
    			add_location(main, file$h, 75, 0, 2003);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(main, t2);
    			mount_component(chart, main, null);
    			append_dev(main, t3);
    			mount_component(button0, main, null);
    			append_dev(main, t4);
    			append_dev(main, a0);
    			mount_component(button1, a0, null);
    			append_dev(main, t5);
    			append_dev(main, a1);
    			mount_component(button2, a1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*id*/ 1) set_data_dev(t1, /*id*/ ctx[0]);
    			const chart_changes = {};
    			chart.$set(chart_changes);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chart.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chart.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			/*chart_binding*/ ctx[4](null);
    			destroy_component(chart);
    			destroy_component(button0);
    			destroy_component(button1);
    			destroy_component(button2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { id } = $$props;

    	// datos obtenidos del backend
    	let dispositivo;

    	let seriesHumedad;
    	let seriesTemperatura;
    	let vLabels = [];
    	let vHumedad = [];
    	let vTemperatura = [];

    	onMount(async () => {
    		await seriesServicio.obtenerDatos(id + "-Humedad").then(respuesta => respuesta.json()).then(resultado => seriesHumedad = resultado);
    		await seriesServicio.obtenerDatos(id + "-Temperatura").then(respuesta => respuesta.json()).then(resultado => seriesTemperatura = resultado);
    		console.log(seriesHumedad.length);
    		console.log(seriesTemperatura.length);

    		const options = {
    			hour: "numeric",
    			minute: "numeric",
    			second: "numeric",
    			year: "numeric",
    			month: "numeric",
    			day: "numeric"
    		};

    		for (let i = 0; i < seriesHumedad.length; i++) {
    			vLabels.push(new Date(seriesHumedad[i][0]).toLocaleDateString("es-es", options));
    			vHumedad.push(seriesHumedad[i][1]);
    			vTemperatura.push(seriesTemperatura[i][1]);
    		}
    	});

    	var data = {
    		labels: vLabels,
    		datasets: [
    			{
    				name: "Temperatura",
    				values: vTemperatura
    			},
    			{ name: "Humedad", values: vHumedad }
    		]
    	};

    	let referencia;
    	const exportar = () => referencia.exportChart();
    	const writable_props = ["id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<Dashboard> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Dashboard", $$slots, []);

    	function chart_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			referencia = $$value;
    			$$invalidate(1, referencia);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		Chart: Base,
    		Button: Button_1,
    		Label,
    		Icon,
    		seriesServicio,
    		onMount,
    		id,
    		dispositivo,
    		seriesHumedad,
    		seriesTemperatura,
    		vLabels,
    		vHumedad,
    		vTemperatura,
    		data,
    		referencia,
    		exportar
    	});

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("dispositivo" in $$props) dispositivo = $$props.dispositivo;
    		if ("seriesHumedad" in $$props) seriesHumedad = $$props.seriesHumedad;
    		if ("seriesTemperatura" in $$props) seriesTemperatura = $$props.seriesTemperatura;
    		if ("vLabels" in $$props) vLabels = $$props.vLabels;
    		if ("vHumedad" in $$props) vHumedad = $$props.vHumedad;
    		if ("vTemperatura" in $$props) vTemperatura = $$props.vTemperatura;
    		if ("data" in $$props) $$invalidate(2, data = $$props.data);
    		if ("referencia" in $$props) $$invalidate(1, referencia = $$props.referencia);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, referencia, data, exportar, chart_binding];
    }

    class Dashboard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dashboard",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !("id" in props)) {
    			console_1$1.warn("<Dashboard> was created without expected prop 'id'");
    		}
    	}

    	get id() {
    		throw new Error("<Dashboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Dashboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/componentes/Mapa.svelte generated by Svelte v3.24.1 */

    const { console: console_1$2 } = globals;
    const file$i = "src/componentes/Mapa.svelte";

    // (90:12) <Label>
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Listado");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(90:12) <Label>",
    		ctx
    	});

    	return block;
    }

    // (89:8) <Button variant="outlined">
    function create_default_slot_2$3(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(89:8) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (95:12) <Label>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Nuevo dispositivo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(95:12) <Label>",
    		ctx
    	});

    	return block;
    }

    // (94:8) <Button variant="outlined">
    function create_default_slot$4(ctx) {
    	let label;
    	let current;

    	label = new Label({
    			props: {
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(94:8) <Button variant=\\\"outlined\\\">",
    		ctx
    	});

    	return block;
    }

    // (99:4) {#if centro && ubicaciones}
    function create_if_block$7(ctx) {
    	let div;
    	let accionesMapa_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "map");
    			set_style(div, "height", "400px");
    			set_style(div, "width", "100%");
    			add_location(div, file$i, 99, 8, 2939);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = action_destroyer(accionesMapa_action = /*accionesMapa*/ ctx[2].call(null, div));
    				mounted = true;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(99:4) {#if centro && ubicaciones}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let a0;
    	let button0;
    	let t2;
    	let a1;
    	let button1;
    	let t3;
    	let current;

    	button0 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button_1({
    			props: {
    				variant: "outlined",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*centro*/ ctx[0] && /*ubicaciones*/ ctx[1] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "Mapa de dispositivos";
    			t1 = space();
    			a0 = element("a");
    			create_component(button0.$$.fragment);
    			t2 = space();
    			a1 = element("a");
    			create_component(button1.$$.fragment);
    			t3 = space();
    			if (if_block) if_block.c();
    			attr_dev(h2, "class", "svelte-f9adgw");
    			add_location(h2, file$i, 85, 4, 2593);
    			attr_dev(a0, "href", "/dispositivos");
    			add_location(a0, file$i, 87, 4, 2628);
    			attr_dev(a1, "href", "/dispositivos/nuevo");
    			add_location(a1, file$i, 92, 4, 2755);
    			add_location(main, file$i, 84, 0, 2582);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			append_dev(main, a0);
    			mount_component(button0, a0, null);
    			append_dev(main, t2);
    			append_dev(main, a1);
    			mount_component(button1, a1, null);
    			append_dev(main, t3);
    			if (if_block) if_block.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);

    			if (/*centro*/ ctx[0] && /*ubicaciones*/ ctx[1]) {
    				if (if_block) ; else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					if_block.m(main, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let mapa;

    	// variable de dispositivos (para mostrar en el mapa)
    	let dispositivos = [];

    	let ubicaciones = [];
    	let centro;

    	onMount(async () => {
    		await dispositivosServicio.listarDispositivos().then(respuesta => respuesta.json()).then(resultado => dispositivos = resultado);
    		await marcadores();
    	});

    	async function marcadores() {
    		if (dispositivos.length > 0) {
    			$$invalidate(0, centro = [
    				dispositivos[0].ubicacion.coordinates[1],
    				dispositivos[0].ubicacion.coordinates[0]
    			]);

    			for (let i = 0; i < dispositivos.length; i++) {
    				ubicaciones.push([
    					dispositivos[i].denominacion,
    					dispositivos[i].ubicacion.coordinates[1],
    					dispositivos[i].ubicacion.coordinates[0],
    					dispositivos[i].id
    				]);
    			}
    		}
    	}

    	function crearMapa(contenedor) {
    		console.log(centro);
    		let m = L.map(contenedor).setView([centro[0], centro[1]], 13);

    		L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
    			subdomains: "abcd",
    			maxZoom: 14
    		}).addTo(m);

    		return m;
    	}

    	function accionesMapa(contenedor) {
    		// creo mapa
    		mapa = crearMapa(contenedor);

    		for (let i = 0; i < ubicaciones.length; i++) {
    			var marker = new L.marker([ubicaciones[i][1], ubicaciones[i][2]]).bindPopup(`${ubicaciones[i][0]} </br>
                <a href="/dispositivos/${ubicaciones[i][3]}/dashboard"> ver dashboard </a> </br>
                <a href="/dispositivos/${ubicaciones[i][3]}"> editarlo </a>`).addTo(mapa);
    		}

    		return {
    			destroy: () => {
    				mapa.remove();
    			}
    		};
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<Mapa> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Mapa", $$slots, []);

    	$$self.$capture_state = () => ({
    		L: L__namespace,
    		onMount,
    		Button: Button_1,
    		Label,
    		Icon,
    		dispositivosServicio,
    		mapa,
    		dispositivos,
    		ubicaciones,
    		centro,
    		marcadores,
    		crearMapa,
    		accionesMapa
    	});

    	$$self.$inject_state = $$props => {
    		if ("mapa" in $$props) mapa = $$props.mapa;
    		if ("dispositivos" in $$props) dispositivos = $$props.dispositivos;
    		if ("ubicaciones" in $$props) $$invalidate(1, ubicaciones = $$props.ubicaciones);
    		if ("centro" in $$props) $$invalidate(0, centro = $$props.centro);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [centro, ubicaciones, accionesMapa];
    }

    class Mapa extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mapa",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.24.1 */
    const file$j = "src/App.svelte";

    // (20:2) <Ruteador>
    function create_default_slot$5(ctx) {
    	let ruta0;
    	let t0;
    	let ruta1;
    	let t1;
    	let ruta2;
    	let t2;
    	let ruta3;
    	let t3;
    	let ruta4;
    	let current;

    	ruta0 = new Ruta({
    			props: { path: "/", componente: Mapa },
    			$$inline: true
    		});

    	ruta1 = new Ruta({
    			props: {
    				path: "/dispositivos",
    				componente: ListadoDispositivos
    			},
    			$$inline: true
    		});

    	ruta2 = new Ruta({
    			props: {
    				path: "/dispositivos/:id",
    				componente: Dispositivo
    			},
    			$$inline: true
    		});

    	ruta3 = new Ruta({
    			props: {
    				path: "/dispositivos/:id/dashboard",
    				componente: Dashboard
    			},
    			$$inline: true
    		});

    	ruta4 = new Ruta({
    			props: { path: "*", componente: NoEncontrado },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(ruta0.$$.fragment);
    			t0 = space();
    			create_component(ruta1.$$.fragment);
    			t1 = space();
    			create_component(ruta2.$$.fragment);
    			t2 = space();
    			create_component(ruta3.$$.fragment);
    			t3 = space();
    			create_component(ruta4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ruta0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(ruta1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(ruta2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(ruta3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(ruta4, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ruta0.$$.fragment, local);
    			transition_in(ruta1.$$.fragment, local);
    			transition_in(ruta2.$$.fragment, local);
    			transition_in(ruta3.$$.fragment, local);
    			transition_in(ruta4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ruta0.$$.fragment, local);
    			transition_out(ruta1.$$.fragment, local);
    			transition_out(ruta2.$$.fragment, local);
    			transition_out(ruta3.$$.fragment, local);
    			transition_out(ruta4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ruta0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(ruta1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(ruta2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(ruta3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(ruta4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(20:2) <Ruteador>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let main;
    	let ruteador;
    	let current;

    	ruteador = new Ruteador({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(ruteador.$$.fragment);
    			add_location(main, file$j, 17, 0, 491);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(ruteador, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const ruteador_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				ruteador_changes.$$scope = { dirty, ctx };
    			}

    			ruteador.$set(ruteador_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ruteador.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ruteador.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(ruteador);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		Ruteador,
    		Ruta,
    		NoEncontrado,
    		ListadoDispositivos,
    		Dispositivo,
    		Dashboard,
    		Mapa
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

}(L));
//# sourceMappingURL=bundle.js.map
