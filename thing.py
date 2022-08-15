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

class LimitedInt:
    def __init__(self, val, min, max):
        self.val = val
        self.min = min
        self.max = max

    def _normalise(self):
        if self.val > self.max:
            self.val /= self.max
    def __add__(self, other):
        self.val += other

class Enum:
    def __init__(self, *items):
        self.items = items