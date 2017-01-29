const amqp = require('amqplib');

function send(url, queueName, data) {
    return amqp.connect(url)
        .then((conn) => {
            conn.on("error", function(err) {
                if (err.message !== "Connection closing") {
                    console.error("[AMQP] conn error", err.message);
                }
            });
            conn.on("close", function() {
                console.error("[AMQP] close connection");
            });

            console.log("[AMQP] connected");

            conn.createChannel()
                .then(function(ch) {
                    var msg = JSON.stringify(data);
                    console.log(msg);
                    return ch
                        .assertQueue(queueName, {
                            durable: true
                        })
                        .then(function(_qok) {
                            // NB: `sentToQueue` and `publish` both return a boolean
                            // indicating whether it's OK to send again straight away, or
                            // (when `false`) that you should wait for the event `'drain'`
                            // to fire before writing again. We're just doing the one write,
                            // so we'll ignore it.
                            ch.sendToQueue(queueName, new Buffer(msg));
                            console.log(" [x] Sent '%s'", msg);
                            return ch.close();
                        });
                }).finally(function() {
                    conn.close();
                });

        });
}

exports.send = send;
