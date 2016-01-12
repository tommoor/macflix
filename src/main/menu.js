'use strict';
const Menu = require('menu');
const path = require('path');
const app = require('app');
const fs = require('fs');
const _ = require('underscore');
const EventEmitter = require('events').EventEmitter;

class AppMenu extends EventEmitter {
  constructor() {
    super();
    this.template = [];
    this.update();
  }

  update() {
    this.getTemplate((data) => {
      this.template = this.parseCommands(data.menu);
      this.menu = Menu.buildFromTemplate(this.template);
      Menu.setApplicationMenu(this.menu);
    });
  }

  /**
   * @getTemplate: Asyncronously load menu template from disk for current platform
   * -@callback   method to call with loaded template
   */
  getTemplate(callback) {
    fs.readFile(path.join(__dirname, '..', '..', 'menus', process.platform + ".json"), 'utf8', function (err, data) {
      if (err) throw err;
      callback( JSON.parse(data) );
    });
  }

  /**
   * @parseCommands: Recursively build the menu template converting event
   * descriptions into click functions
   * -@template   object representing menu
   * -@return     parsed object representing menu
   */
  parseCommands(template) {
    var self = this;
    return _.map(template, (item) => {
      if (item.event) {
        item.click = function() {
          self.emit('action', item.event, item.param);
        };
      } else if (item.submenu) {
        item.submenu = this.parseCommands(item.submenu);
      }
      return item;
    });
  }

  /**
   * @flattenMenuTemplate: Flattens the given menu template into an single Array.
   * descriptions into click functions
   * -@template   object representing menu
   * -@return     parsed flattened array representing menu
   */
  flattenMenuTemplate(template) {
    var items = [];
    _.each(template, (item) => {
      items.push(item);
      if (item.submenu) {
        items = items.concat(this.flattenMenuTemplate(item.submenu));
      }
    });

    return items;
  }
}

module.exports = AppMenu;