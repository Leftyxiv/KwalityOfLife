from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth import authenticate, login, logout
from customuser.forms import CustomUserChangeForm, CustomUserCreationForm, LoginForm
from customuser.models import CustomUser

# Create your views here.
# SignUp
def customUserCreation_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            # form.cleaned_data.get('password')
            user = CustomUser.objects.create_user(first_name=data['first_name'], last_name=data['last_name'], username=data['username'], password=data['password'], email=data['email'])
            login(request, user)
        return HttpResponseRedirect(request.GET.get('next', reverse('homepage')))

    form =CustomUserCreationForm()
    return render(request, "form.html", {'form' : form})

# Login
def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = authenticate(request, username=data['username'], password=data['password'])
            # user = form.save()
            if user: 
                login(request, user)
            return HttpResponseRedirect(request.GET.get('next', reverse('homepage')))
    form = LoginForm()
    return render(request, "form.html", {'form' : form})

# User Edit View
def customUserChange_view(request, ticket_id):
    item = CustomUser.objects.get(id=ticket_id)

    if request.method == "POST":
        form = CustomUserChangeForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            item.username = data['username']
            item.email = data['email']
            item.first_name = data['first_name']
            item.last_name = data['last_name']
            item.save()
            return HttpResponseRedirect(reverse('ticket_details', args=(ticket_id,)))

    form = CustomUserChangeForm(initial={
        'username': item.username,
        'email' : item.email,
        'first_name' : item.first_name,
        'last_name' : item.last_name,


    })
    return render(request, "form.html", {"form": form})





# Log out
def loggedOut_view(request):
    logout(request)
    return HttpResponseRedirect(request.GET.get('next', reverse('homepage')))

