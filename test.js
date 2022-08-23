

const $counter = (val = 0) => $(
    "button", 
    {className: "yes"}, 
    [`Count: ${val}!`],
    [
        ["click", function(e, $){
            $.set("val", $.props.val + 1)
        }],
        ["contextmenu", function(e, $){
            e.preventDefault();
            $.set("val", $.props.val - 1)
        }]
    ]
)

const $$counter = $$($counter);

const counter = $$counter();

BODY.append(counter)

