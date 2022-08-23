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

def __(meth):
    def _(ref, other):
        if type(other) == "int":
            meth(ref, other)
        elif type(other) == "float":
            meth(ref, int(other))
    return _

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

class Count:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        return self.func(*args, **kwargs)



@Count
def sayHi():
    print("Hi")

sayHi()
sayHi()
sayHi()
sayHi()

print(sayHi.count)
