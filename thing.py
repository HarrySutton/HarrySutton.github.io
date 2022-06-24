def Class(a, b):
    dict = {
        "a": a,
        "b": b
    }

    def setter(key, val):
        dict[key] = val

    dict["set"] = setter

    def getter(key):
        return dict[key]

    return getter

obj = Class(1, Class(3, 4))


obj("b")("set")("a", 6)

print(obj("b")("a"))

print(obj("a"))
