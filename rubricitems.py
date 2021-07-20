# Three class based views

# from comments.views
class CreateCommentView(LoginRequiredMixin, View):
    def get(self, request):
        template_name = 'form.html'
        form = AddComment()
        return render(request, 'form.html', {'form': form})

    def post(self, request, post_id):
        user = request.user
        post = Post.objects.get(id=post_id)
        form = AddComment(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            if '@' in data['body']:
                pattern = '@(\w+)'
                result = re.findall(pattern, data['body'])[0]
                user_to_notify = CustomUser.objects.get(username=result)
                if user_to_notify:
                    Notifications.objects.create(text=data['body'], user=user_to_notify)
            Comment.objects.create(
                body=data['body'],
                post=post,
                user=user
            )
            return HttpResponseRedirect(f'/post/{post.id}/')
        else:
            print(form.errors)
            return HttpResponseRedirect(reverse('homepage'))

#from the customuser.views
class CustomUserChangeView(LoginRequiredMixin, View):
    def get(self, request):
        item = request.user
        
        form = CustomUserChangeForm(initial={
            'username': item.username,
            'email' : item.email,
            'first_name' : item.first_name,
            'last_name' : item.last_name,

        })
        return render(request, "form.html", {"form": form})

    def post(self, request):
        item = request.user

        if request.method == "POST":
            form = CustomUserChangeForm(request.POST)

            if form.is_valid():
                data = form.cleaned_data
                item.username = data['username']
                item.email = data['email']
                item.first_name = data['first_name']
                item.last_name = data['last_name']
                item.save()
                return HttpResponseRedirect('/')

# from directmessages.views
class FormView(View):
  def get(self, request, *args, **kwargs):
    form = MessageForm()
    return render(request, 'form.html', context={'form': form})

  def post(self, request, *args, **kwargs):
    form = MessageForm(request.POST)
    if form.is_valid():
      data = form.cleaned_data
      message = Message.objects.create(
        sender=request.user,
        receiver=data['receiver'],
        content=data['content']
      )
      print(message)
      message.save()
      return HttpResponseRedirect('/sentmessages/')

# simple form - from comments.forms
class AddComment(forms.Form):
    body = forms.CharField(widget=forms.Textarea)

# model form - from posts.forms
class PostForm(ModelForm):
  class Meta:
    model = Post
    fields = ['title', 'company_website', 'product_image', 'description' ]

# admin interface
"""
admin.site.register(Comment)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Message)
admin.site.register(Notifications)
admin.site.register(Post)
"""

# 3 db qs methods

# from post views, get method
def get_comments(request, post_id, *args, **kwargs):  # line 60
  post = Post.objects.get(id=post_id)
  comments = Comment.objects.filter(post=post)

class PostAPIView(APIView):  # line 99
  parser_classes = (MultiPartParser, FormParser)

  def get(self, request, *args, **kwargs):
    posts = Post.objects.all()
    serializer = PostApiSerializer(posts, many=True)
    return Response(serializer.data)

# from posts.models
class Post(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True, blank=True)
  title = models.CharField(max_length=200)
  company_website = models.URLField(blank=True, null=True)
  product_image = models.ImageField(upload_to='uploads/', max_length=100)
  description = models.TextField()