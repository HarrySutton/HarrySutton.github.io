

const $counter = (val = 0) => $(
    "p", 
    {}, 
    [`Count: ${val}!`],
    [
        ["click", function(e, $){
            $.set("val", $.props.val + 1)
        }]
    ]
)

const $$counter = $$($counter);

const counter = $$counter();

BODY.append(counter)

