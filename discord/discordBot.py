import discord, json, requests, re
from discord.ext import commands, tasks

intents = discord.Intents.default()
# message send available
intents.message_content = True
# prefix : >
bot = commands.Bot(command_prefix='>', intents=intents)

# if it is ready,
@bot.event
async def on_ready():
    print("BOT NOW ONLINE") 
    checkforvideos.start()

# if bot joined a guild
# add guild id to youtubedata.json file
# and check latest video url
@bot.event
async def on_guild_join(guild):
    with open("youtubedata.json", "r") as f:
        data = json.load(f)
    if not data.get(str(guild.system_channel.id), ''):
        data[str(guild.system_channel.id)] = {"latest_video_url": "none"}
    with open('youtubedata.json', 'w') as f:
        json.dump(data, f)
    print(guild)

# message command
@bot.command()
async def ping(ctx):
    await ctx.send('your system_channel_id : ' + ctx.guild.system_channel.id)
    await ctx.send('pong')

# perform this every minute
@tasks.loop(minutes=1)
async def checkforvideos():
    print('시작')
    with open("youtubedata.json", "r") as f:
        data = json.load(f)
    for discord_channel_id in data:
        channel = f'https://youtube.com/channel/UCAuUUnT6oDeKwE6v1NGQxug'
        html = requests.get(channel + '/videos').text
        # print(html)
        try:
            latest_video_url = f'https://youtube.com/watch?v=' + re.search('(?<="videoId":").*?(?=")', html).group()
            print(latest_video_url)
        except:
            continue
        if not str(data[discord_channel_id]['latest_video_url']) == latest_video_url:
            print(str(data[discord_channel_id]['latest_video_url']))
            data[str(discord_channel_id)]['latest_video_url'] = latest_video_url
            with open('youtubedata.json', 'w') as f:
                json.dump(data, f)
            discord_channel = bot.get_channel(int(discord_channel_id))
            msg = f'TED Video is Just Uploaded, Check It Out : {latest_video_url}'
            await discord_channel.send(msg)

bot.run('MTAzNDk5NjQxNjI4MTU3OTU0MA.GoeSUm.W5_KMu9hayyaZX3ClwbjarAY80Y5If-TNHEIek')