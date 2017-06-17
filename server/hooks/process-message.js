// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function () { // eslint-disable-line no-unused-vars
  return function (hook) {
    // the authenticated user
    const user = hook.params.user;

    // The actual message text
    const text = hook.data.text
      .substring(0, 400)

      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    hook.data = {
      text: text,
      userId: user._id,

    };

    
    return Promise.resolve(hook);
  };
};
