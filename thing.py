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

def output(func):
    def wrapper(*args, **kwargs):
        val = func(*args, **kwargs)
        print(val)
        return val
    return wrapper


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

def repeat(n = 2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator
    
class Cache:
    def __init__(self, func):
        self.func = func
        self.cache = dict()

    def __call__(self, *args, **kwargs):
        key = str((args, kwargs))

        if key in self.cache:
            return self.cache[key]

        else:
            val = self.func(*args, **kwargs)
            self.cache[key] = val
            return val

    def __str__(self):
        for args in self.cache:
            val = self.cache[args]
            print(args, val)

@Cache
def fib(n):
    if n == 1 or n == 2:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)

print(fib(40))

print(fib)

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
