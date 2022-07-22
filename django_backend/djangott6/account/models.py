from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings

# Manager for user profiles
class UserProfileManager(BaseUserManager):
    def create_user(self, name, password=None):
        user = self.model(name=name,)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, name, password):
        user = self.create_user(name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

# Maps our user attributes to the ORM database
class UserProfile(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'name'

    def __str__(self):
        return self.name