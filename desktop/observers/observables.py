class Observable:
    def __init__(self):
        self.observers = []

    def register_observer(self, observer):
        self.observers.append(observer)

    def notify_observers(self, *args, **kwargs):
        for observer in self.observers:
            observer.update(*args, **kwargs)