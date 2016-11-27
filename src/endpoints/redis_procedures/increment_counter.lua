local current
local flip
flip = redis.call("get","backend_counter_flip")
current = redis.call("get","backend_counter")
if flip == "1" then
  current = redis.call("decr","backend_counter")
  if tonumber(current) <= 0 then
    redis.call("set", "backend_counter_flip", "0")
  end
else
  current = redis.call("incr","backend_counter")
  if tonumber(current) >= 10 then
    redis.call("set", "backend_counter_flip", "1")
  end
end
