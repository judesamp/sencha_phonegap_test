Ext.define('shaglamMobileClient.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
    config: {
        title: 'Login',
        items: [
            {
                xtype: 'image',
                src: Ext.Viewport.getOrientation() == 'portrait' ? '../../../img/login.png' : '../../../img/login-small.png',
                style: Ext.Viewport.getOrientation() == 'portrait' ? 'width:80px;height:80px;margin:auto' : 'width:40px;height:40px;margin:auto'
            },
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
            {
                xtype: 'fieldset',
                title: 'Login Example',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log In'
            },
            {
                xtype: 'button',
                itemId: 'FacebooklogInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log in with Facebook'
                //html: "<a href='https://localhost:3000/client-api/v1/auth/facebook?state=client'>Client Sign in with Facebook</a>"
            },
            {

                xtype: 'button',
                itemId: 'TwitterlogInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log in With Twitter'

                //html: "<a href='https://localhost:3000/client-api/v1/auth/twitter?state=client'>Client Sign in with Twitter</a>"

            }
         ],
        listeners: [{
            delegate: '#logInButton',
            event: 'tap',
            fn: 'onLogInButtonTap'
        },
        {
            delegate: '#FacebooklogInButton',
            event: 'tap',
            fn: 'onFacebookLogInButtonTap' 
        },
        {
            delegate: '#TwitterlogInButton',
            event: 'tap',
            fn: 'onTwitterLogInButtonTap' 
        },

        ]
    },
    // showLoginText: function() {

    //     var redirectUrl = Ext.Object.toQueryString({
    //         redirect_uri: window.location.protocol + "//" + window.location.host + window.location.pathname,
    //         client_id: shaglamMobileClient.app.facebookAppId,
    //         response_type: 'token'
    //     });

    //     this.setHtml([
    //         '<h2>Welcome to Jog with Friends</h2>',
    //         '<p>With this app you can log your runs and share your progress with your friends</p>',
    //         '<p>In order to use Jog with Friends you must sign in with your Facebook account.</p>',
    //         '<a class="fbLogin" href="https://m.facebook.com/dialog/oauth?' + redirectUrl + '"></a>',
    //         '<div class="fb-facepile" data-app-id="' + shaglamMobileClient.app.facebookAppId + '" data-max-rows="2" data-width="300"></div>'
    //     ].join(''));

    //      FB.XFBML.parse(document.getElementById('splash'));
    // },
    onLogInButtonTap: function () {

        var me = this,
            usernameField = me.down('#userNameTextField'),
            passwordField = me.down('#passwordTextField'),
            label = me.down('#signInFailedLabel'),
            username = usernameField.getValue(),
            password = passwordField.getValue();

        label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            label.setHtml('');

            me.fireEvent('signInCommand', me, username, password);

            usernameField.setValue('');
            passwordField.setValue('');
        });

        task.delay(500);

    },
    onFacebookLogInButtonTap: function () {

       Ext.Ajax.request({
            url: 'https://localhost:3000/client-api/v1/auth/facebook?state=client',
            method: 'get',
            success: function (response) {
                console.log(response);
               alert('success');
            },
            failure: function (response) {
                console.log(response);
                alert('failure');
            }
        });

    },
    onTwitterLogInButtonTap: function () {
        Ext.Ajax.request({
            url: 'https://localhost:3000/client-api/v1/auth/twitter?state=client',
            method: 'get',
            success: function (response) {
                console.log(response);
               alert('success');
            },
            failure: function (response) {
                console.log(response);
                alert('failure');
            }
        });
    },
    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }
});